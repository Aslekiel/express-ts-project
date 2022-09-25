import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Book, book => book.cart, {cascade: true})
  @JoinColumn()
  books: Book[];

  @OneToOne(() => User, (user) => user.cart, {cascade: true})
  @JoinColumn()
  user: User;
}