import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ClientsModule, Transport } from '@nestjs/microservices'
import { RabbitmqConsumer } from './rabbitmq.consumer';
import { NotificationModule } from '@src/notification/notification.module';

@Module({
  imports: [
    ClientsModule.register([{
      name: "RABBIT_SERVICE",
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: 'main_queue',
        noAck: true,
        queueOptions: {
          durable: false
        },
      },
    }]),
    NotificationModule,
  ],
  controllers: [RabbitmqConsumer],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
