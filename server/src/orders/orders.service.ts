import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
  ) {}

  async findAll(userId: string) {
    return this.orderRepo.find({
      where: { userId },
      relations: {
        items: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string, userId: string) {
    const order = await this.orderRepo.findOne({
      where: { id, userId },
      relations: {
        items: true,
      },
    });

    if (!order) {
      const fallbackOrder = await this.orderRepo.findOne({
        where: { id },
      });

      if (!fallbackOrder) {
        throw new NotFoundException('Order not found');
      }

      throw new ForbiddenException('You cannot access this order');
    }

    return order;
  }
}
