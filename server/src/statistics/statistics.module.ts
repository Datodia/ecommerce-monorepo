import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '@src/products/entities/product.entity';
import { Category } from '@src/categories/entities/category.entity';
import { User } from '@src/users/entities/user.entity';
import { Order } from '@src/orders/entities/order.entity';
import { AuthModule } from '@src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, User, Order]),
    AuthModule,
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
