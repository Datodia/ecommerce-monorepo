import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@src/products/entities/product.entity';
import { User } from '@src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import Stripe = require('stripe');
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { Order, OrderStatus } from '@src/orders/entities/order.entity';
import { OrderItem } from '@src/orders/entities/order-item.entity';

type StripeClient = Stripe.Stripe;
type CheckoutSessionCreateParams = NonNullable<
  Parameters<StripeClient['checkout']['sessions']['create']>[0]
>;
type CheckoutLineItem = NonNullable<CheckoutSessionCreateParams['line_items']>[number];
type CheckoutSessionEvent = {
  type: 'checkout.session.completed';
  data: {
    object: {
      id: string;
      metadata?: Record<string, string> | null;
      payment_status?: string;
      amount_total?: number | null;
      amount_subtotal?: number | null;
      currency?: string | null;
      payment_intent?: string | { id: string } | null;
    };
  };
};

@Injectable()
export class PaymentService {
  private readonly stripe: StripeClient;

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {
    const secretKey = this.configService.get<string>(
      'payment.stripe.secretKey',
    );
    if (!secretKey) {
      throw new Error('Stripe secret key is not configured');
    }

    this.stripe = new Stripe(secretKey);
  }

  async createCheckoutSession(
    userId: string,
    createCheckoutDto: CreateCheckoutDto,
  ) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const productIds = createCheckoutDto.items.map((item) => item.productId);
    const uniqueProductIds = [...new Set(productIds)];
    const products = await this.productRepo.find({
      where: { id: In(uniqueProductIds) },
    });

    if (products.length !== uniqueProductIds.length) {
      throw new NotFoundException('One or more products were not found');
    }

    const productsById = new Map(
      products.map((product) => [product.id, product]),
    );
    const currency =
      this.configService.get<string>('payment.stripe.currency') ?? 'usd';
    const frontendUrl =
      this.configService.get<string>('frontend.url') || 'http://localhost:3000';

    const lineItems: CheckoutSessionCreateParams['line_items'] =
      createCheckoutDto.items.map((item) => {
      const product = productsById.get(item.productId);
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      const thumbnail = item.thumbnail ?? product.thumbnail;

      return {
        quantity: item.quantity,
        price_data: {
          currency,
          unit_amount: Math.round(Number(product.price) * 100),
          product_data: {
            name: product.name,
            description: product.description ?? undefined,
            images: thumbnail ? [thumbnail] : undefined,
            metadata: {
              productId: product.id,
            },
          },
        },
      } as CheckoutLineItem;
      });

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      client_reference_id: userId,
      customer_email: user.email,
      success_url: `${frontendUrl}/orders?status=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${frontendUrl}/checkout?status=cancelled`,
      metadata: {
        userId,
        address: createCheckoutDto.address,
        phoneNumber: createCheckoutDto.phoneNumber,
        buildingNumber: createCheckoutDto.buildingNumber,
        additionalInfo: createCheckoutDto.additionalInfo ?? '',
      },
      line_items: lineItems,
    });

    return {
      id: session.id,
      url: session.url,
    };
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const secret = this.configService.get<string>(
      'payment.stripe.webhookSecret',
    );
    if (!secret) {
      throw new BadRequestException('Stripe webhook secret is not configured');
    }

    let event: CheckoutSessionEvent;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        secret,
      ) as CheckoutSessionEvent;
    } catch (error) {
      throw new BadRequestException(
        `Stripe webhook signature verification failed: ${(error as Error).message}`,
      );
    }

    if (event.type !== 'checkout.session.completed') {
      return { received: true };
    }

    const session = event.data.object;
    const userId = session.metadata?.userId;

    if (!userId) {
      throw new BadRequestException(
        'Checkout session is missing user metadata',
      );
    }

    if (session.payment_status !== 'paid') {
      return { received: true, skipped: true };
    }

    const existingOrder = await this.orderRepo.findOne({
      where: { stripeSessionId: session.id },
      relations: { items: true },
    });

    if (existingOrder) {
      return { received: true, orderId: existingOrder.id, duplicate: true };
    }

    const lineItems = await this.stripe.checkout.sessions.listLineItems(
      session.id,
      {
        limit: 100,
        expand: ['data.price.product'],
      },
    );

    const shipping = session.metadata ?? {};
    const orderItems = lineItems.data.map((item) => {
      const product =
        item.price && typeof item.price.product !== 'string'
          ? item.price.product
          : null;

      if (!product || 'deleted' in product) {
        throw new BadRequestException(
          'Stripe line item is missing product metadata',
        );
      }

      const productId = product.metadata?.productId;
      if (!productId) {
        throw new BadRequestException(
          'Stripe line item is missing product metadata',
        );
      }

      const quantity = item.quantity ?? 1;
      const unitPrice = Number((item.price?.unit_amount ?? 0) / 100);
      const subtotal = Number(((item.amount_total ?? 0) / 100).toFixed(2));

      return {
        productId,
        productName: item.description ?? product.name ?? 'Product',
        thumbnail:
          Array.isArray(product.images) && product.images.length > 0
            ? product.images[0]
            : null,
        unitPrice,
        quantity,
        subtotal,
      };
    });

    const totalAmount = Number(((session.amount_total ?? 0) / 100).toFixed(2));
    const subtotalAmount = Number(
      ((session.amount_subtotal ?? session.amount_total ?? 0) / 100).toFixed(2),
    );

    const order = this.orderRepo.create({
      userId,
      status: OrderStatus.PAID,
      currency:
        session.currency ??
        this.configService.get<string>('payment.stripe.currency') ??
        'usd',
      subtotalAmount,
      totalAmount,
      address: shipping.address ?? '',
      phoneNumber: shipping.phoneNumber ?? '',
      buildingNumber: shipping.buildingNumber ?? '',
      additionalInfo: shipping.additionalInfo || null,
      stripeSessionId: session.id,
      stripePaymentIntentId:
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : (session.payment_intent?.id ?? null),
      items: orderItems as OrderItem[],
    });

    const savedOrder = await this.orderRepo.save(order);
    return { received: true, orderId: savedOrder.id };
  }
}
