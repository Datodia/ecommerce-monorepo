import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '@src/products/entities/product.entity';
import { Category } from '@src/categories/entities/category.entity';
import { User } from '@src/users/entities/user.entity';
import { Order } from '@src/orders/entities/order.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Product) private readonly productRepo: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  async getAll() {
    const [products, categories, users, orders, revenueResult] = await Promise.all([
      this.productRepo.count(),
      this.categoryRepo.count(),
      this.userRepo.count(),
      this.orderRepo.count(),
      this.orderRepo
        .createQueryBuilder('order')
        .select('SUM(order.totalAmount)', 'total')
        .getRawOne<{ total: string }>(),
    ]);

    return {
      products,
      categories,
      users,
      orders,
      revenue: Number(revenueResult?.total ?? 0),
    };
  }
}
