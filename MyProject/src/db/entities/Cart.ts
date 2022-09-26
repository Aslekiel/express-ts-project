import { Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[];

  @OneToOne(() => User, (user) => user.cart, { cascade: true })
  @JoinColumn()
  user: User;
}
