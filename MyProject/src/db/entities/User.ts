import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './Cart';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  fullname: string;

  @Column({ type: 'varchar', nullable: false, length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 255, select: false })
  password: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  avatar: string;

  @OneToOne(() => Cart, (cart) => cart.user)
  cart: Cart;
}
