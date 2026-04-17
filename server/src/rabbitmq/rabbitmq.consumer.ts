import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationService } from '@src/notification/notification.service';

@Controller()
export class RabbitmqConsumer {
    constructor(
        private readonly notificationService: NotificationService,
    ) {}

  @EventPattern('order_created')
  handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();

    const orderId = data?.orderId ?? '3cb1dbae-55b1-4cfd-b696-d889db4e4db9';

    this.notificationService.sendOrderStatus(
      data.userEmail,
      orderId,
      'created',
      {
        orderItems: data?.orderItems,
        totalAmount: data?.totalAmount,
        currency: data?.currency,
      },
    );

    channel.ack(message);
  }
}
