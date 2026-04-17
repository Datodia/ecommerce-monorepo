import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@src/auth/guard/auth.guard';
import { User } from '@src/users/decorators/user.decorator';
import { AdminGuard } from '@src/auth/guard/admin.guard';
import { Admin } from '@src/auth/decorators/admin.decorator';
import { UpdateOrderAdminDto } from './dto/update-order-admin.dto';

@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  findAll(@User() user: { userId: string }) {
    return this.ordersService.findAll(user.userId);
  }

  @Get('admin/all')
  @UseGuards(AdminGuard)
  @Admin()
  findAllForAdmin() {
    return this.ordersService.findAllForAdmin();
  }

  @Patch('admin/:id')
  @UseGuards(AdminGuard)
  @Admin()
  updateForAdmin(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateOrderAdminDto: UpdateOrderAdminDto,
  ) {
    return this.ordersService.updateForAdmin(id, updateOrderAdminDto);
  }

  @Delete('admin/:id')
  @UseGuards(AdminGuard)
  @Admin()
  removeForAdmin(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ordersService.removeForAdmin(id);
  }

  @Get(':id')
  findOne(
    @User() user: { userId: string },
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.ordersService.findOne(id, user.userId);
  }
}
