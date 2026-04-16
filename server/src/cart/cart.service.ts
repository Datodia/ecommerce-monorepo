import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '@src/products/entities/product.entity';
import { User } from '@src/users/entities/user.entity';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(authUserId: string, createCartDto: CreateCartDto) {
    if (createCartDto.userId && createCartDto.userId !== authUserId) {
      throw new ForbiddenException('You can only create a cart for yourself');
    }

    await this.ensureUserExists(authUserId);

    const existingCart = await this.cartRepo.findOne({
      where: { userId: authUserId },
    });
    if (existingCart) {
      throw new ConflictException('Cart already exists for this user');
    }

    const cart = this.cartRepo.create({
      userId: authUserId,
      totalAmount: 0,
    });

    const savedCart = await this.cartRepo.save(cart);
    return this.findOne(savedCart.id, authUserId);
  }

  async findAll(authUserId: string) {
    return this.cartRepo.find({
      where: { userId: authUserId },
      relations: {
        items: {
          product: true,
        },
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string, authUserId: string) {
    const cart = await this.cartRepo.findOne({
      where: { id },
      relations: {
        items: {
          product: true,
        },
      },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    this.assertCartOwnership(cart, authUserId);

    return cart;
  }

  async update(id: string, authUserId: string, updateCartDto: UpdateCartDto) {
    const cart = await this.findOne(id, authUserId);

    if (updateCartDto.userId && updateCartDto.userId !== cart.userId) {
      throw new ForbiddenException('You cannot reassign cart ownership');
    }

    await this.cartRepo.update({ id }, {});
    return this.findOne(id, authUserId);
  }

  async remove(id: string, authUserId: string) {
    const cart = await this.findOne(id, authUserId);
    await this.cartRepo.delete({ id });
    return cart;
  }

  async addItem(
    cartId: string,
    authUserId: string,
    createCartItemDto: CreateCartItemDto,
  ) {
    await this.findOne(cartId, authUserId);

    if (createCartItemDto.cartId !== cartId) {
      throw new BadRequestException('cartId in body must match route cartId');
    }

    const product = await this.productRepo.findOne({
      where: { id: createCartItemDto.productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingItem = await this.cartItemRepo.findOne({
      where: {
        cartId,
        productId: createCartItemDto.productId,
      },
      relations: {
        product: true,
      },
    });

    if (existingItem) {
      existingItem.quantity += createCartItemDto.quantity;
      await this.cartItemRepo.save(existingItem);
      await this.recalculateCartTotal(cartId);
      return this.findItem(cartId, authUserId, existingItem.id);
    }

    const cartItem = this.cartItemRepo.create(createCartItemDto);
    const savedItem = await this.cartItemRepo.save(cartItem);
    await this.recalculateCartTotal(cartId);
    return this.findItem(cartId, authUserId, savedItem.id);
  }

  async findAllItems(cartId: string, authUserId: string) {
    await this.findOne(cartId, authUserId);
    return this.cartItemRepo.find({
      where: { cartId },
      relations: {
        product: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findItem(cartId: string, authUserId: string, itemId: string) {
    await this.findOne(cartId, authUserId);

    const item = await this.cartItemRepo.findOne({
      where: {
        id: itemId,
        cartId,
      },
      relations: {
        product: true,
      },
    });

    if (!item) {
      throw new NotFoundException('Cart item not found');
    }

    return item;
  }

  async updateItem(
    cartId: string,
    authUserId: string,
    itemId: string,
    updateCartItemDto: UpdateCartItemDto,
  ) {
    const item = await this.findItem(cartId, authUserId, itemId);

    if (updateCartItemDto.quantity !== undefined) {
      item.quantity = updateCartItemDto.quantity;
    }

    await this.cartItemRepo.save(item);
    await this.recalculateCartTotal(cartId);
    return this.findItem(cartId, authUserId, itemId);
  }

  async removeItem(cartId: string, authUserId: string, itemId: string) {
    const item = await this.findItem(cartId, authUserId, itemId);
    await this.cartItemRepo.delete({ id: itemId, cartId });
    await this.recalculateCartTotal(cartId);
    return item;
  }

  async clearItems(cartId: string, authUserId: string) {
    await this.findOne(cartId, authUserId);
    await this.cartItemRepo.delete({ cartId });
    await this.recalculateCartTotal(cartId);
    return this.findOne(cartId, authUserId);
  }

  private async ensureUserExists(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  private async recalculateCartTotal(cartId: string) {
    const items = await this.cartItemRepo.find({
      where: { cartId },
      relations: {
        product: true,
      },
    });

    const total = items.reduce((sum, item) => {
      const price = Number(item.product?.price ?? 0);
      return sum + price * item.quantity;
    }, 0);

    await this.cartRepo.update(
      { id: cartId },
      { totalAmount: Number(total.toFixed(2)) },
    );
  }

  private assertCartOwnership(cart: Cart, authUserId: string) {
    if (cart.userId !== authUserId) {
      throw new ForbiddenException('You can only access your own cart');
    }
  }
}
