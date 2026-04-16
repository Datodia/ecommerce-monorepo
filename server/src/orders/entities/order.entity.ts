import { User } from '@src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

export enum OrderStatus {
  PAID = 'paid',
}

@Entity()
@Index('IDX_order_userId', ['userId'])
@Index('UQ_order_stripeSessionId', ['stripeSessionId'], { unique: true })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  userId!: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column({ type: 'varchar', length: 20, default: OrderStatus.PAID })
  status!: OrderStatus;

  @Column({ type: 'varchar', length: 10, default: 'usd' })
  currency!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  subtotalAmount!: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  totalAmount!: number;

  @Column({ type: 'varchar', length: 255 })
  address!: string;

  @Column({ type: 'varchar', length: 64 })
  phoneNumber!: string;

  @Column({ type: 'varchar', length: 64 })
  buildingNumber!: string;

  @Column({ type: 'text', nullable: true })
  additionalInfo?: string | null;

  @Column({ type: 'varchar', length: 255 })
  stripeSessionId!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  stripePaymentIntentId?: string | null;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    eager: true,
  })
  items!: OrderItem[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
