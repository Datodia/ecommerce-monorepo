import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@src/auth/guard/auth.guard';
import { User } from '@src/users/decorators/user.decorator';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@User() user: { userId: string }) {
    return this.ordersService.findAll(user.userId);
  }

  @Get(':id')
  findOne(
    @User() user: { userId: string },
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.ordersService.findOne(id, user.userId);
  }
}
