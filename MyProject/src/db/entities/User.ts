import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './Cart';
import { Favorite } from './Favorite';
import { Rating } from './Rating';

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

  @OneToMany(() => Cart, (cart) => cart.user)
  cart: Cart[];

  @OneToMany(() => Favorite, (favorite) => favorite.user, { cascade: true })
  @JoinTable()
  favorites: Favorite[];

  @OneToMany(() => Rating, (rating) => rating.user, { cascade: true })
  ratings: Rating[];
}
