import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './Cart';
import { Genre } from './Genre';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  title: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  author: string;

  @ManyToMany(() => Genre)
  @JoinTable()
  genres: Genre[];

  @Column({ type: 'varchar', nullable: true, length: 2550 })
  description: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  logo: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  rating: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  comments: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  price: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  dateOfIssue: string;

  @ManyToOne(() => Cart, cart => cart.books)
  @JoinColumn()
  cart: Cart;
}
