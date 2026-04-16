import { Cart } from '@src/cart/entities/cart.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('varchar', { nullable: false })
  fullName!: string;

  @Column('varchar', { nullable: false, unique: true })
  email!: string;

  @Column('varchar', { nullable: false })
  password!: string;

  @Column('boolean', { default: false })
  isAdmin!: boolean;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart?: Cart;
}
