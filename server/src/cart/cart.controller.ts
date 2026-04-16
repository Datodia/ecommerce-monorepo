import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { AuthGuard } from '@src/auth/guard/auth.guard';
import { User } from '@src/users/decorators/user.decorator';

@Controller('cart')
@UseGuards(AuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(
    @User() user: { userId: string },
    @Body() createCartDto: CreateCartDto,
  ) {
    return this.cartService.create(user.userId, createCartDto);
  }

  @Get()
  findAll(@User() user: { userId: string }) {
    return this.cartService.findAll(user.userId);
  }

  @Get(':id')
  findOne(
    @User() user: { userId: string },
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.cartService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @User() user: { userId: string },
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.update(id, user.userId, updateCartDto);
  }

  @Delete(':id')
  remove(
    @User() user: { userId: string },
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return this.cartService.remove(id, user.userId);
  }

  @Post(':cartId/items')
  addItem(
    @User() user: { userId: string },
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Body() createCartItemDto: CreateCartItemDto,
  ) {
    return this.cartService.addItem(cartId, user.userId, createCartItemDto);
  }

  @Get(':cartId/items')
  findAllItems(
    @User() user: { userId: string },
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
  ) {
    return this.cartService.findAllItems(cartId, user.userId);
  }

  @Get(':cartId/items/:itemId')
  findItem(
    @User() user: { userId: string },
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
  ) {
    return this.cartService.findItem(cartId, user.userId, itemId);
  }

  @Patch(':cartId/items/:itemId')
  updateItem(
    @User() user: { userId: string },
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartService.updateItem(
      cartId,
      user.userId,
      itemId,
      updateCartItemDto,
    );
  }

  @Delete(':cartId/items/:itemId')
  removeItem(
    @User() user: { userId: string },
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
    @Param('itemId', new ParseUUIDPipe()) itemId: string,
  ) {
    return this.cartService.removeItem(cartId, user.userId, itemId);
  }

  @Delete(':cartId/items')
  clearItems(
    @User() user: { userId: string },
    @Param('cartId', new ParseUUIDPipe()) cartId: string,
  ) {
    return this.cartService.clearItems(cartId, user.userId);
  }
}
