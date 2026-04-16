import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@src/products/entities/product.entity';
import { User } from '@src/users/entities/user.entity';
import { Order } from '@src/orders/entities/order.entity';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Order]), AuthModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
