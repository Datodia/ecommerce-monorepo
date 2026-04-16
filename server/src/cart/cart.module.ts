import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Product } from '@src/products/entities/product.entity';
import { User } from '@src/users/entities/user.entity';
import { AuthModule } from '@src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@src/auth/guard/auth.guard';

@Module({
  imports: [
    AuthModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
      }),
    }),
    TypeOrmModule.forFeature([Cart, CartItem, Product, User]),
  ],
  controllers: [CartController],
  providers: [CartService, AuthGuard],
})
export class CartModule {}
