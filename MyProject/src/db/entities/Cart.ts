import { Column, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './Book';
import { User } from './User';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book)
  @JoinTable()
  books: Book[];

  @ManyToOne(() => User, (user) => user.cart, { cascade: true })
  @JoinColumn()
  user: User;

  @Column({ type: 'integer', nullable: false })
  bookId: number;

  @Column({ type: 'integer', nullable: false })
  userId: number;

  @Column({ type: 'integer', nullable: false, default: 1 })
  count: number;
}
