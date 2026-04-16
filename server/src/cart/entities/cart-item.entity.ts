import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '@src/products/entities/product.entity';

@Entity()
@Unique('UQ_cart_item_cartId_productId', ['cartId', 'productId'])
@Index('IDX_cart_item_cartId', ['cartId'])
@Index('IDX_cart_item_productId', ['productId'])
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cartId' })
  cart!: Cart;

  @Column('uuid')
  cartId!: string;

  @ManyToOne(() => Product, { eager: false, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'productId' })
  product!: Product;

  @Column('uuid')
  productId!: string;

  @Column({ default: 1 })
  quantity!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
