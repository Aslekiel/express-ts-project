import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from './Comment';
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

  @Column({ type: 'varchar', nullable: true })
  rating: string;

  @Column({ type: 'float', nullable: true })
  price: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  dateOfIssue: string;

  @OneToMany(() => Comment, (comment) => comment.books)
  comments: Comment[];
}
