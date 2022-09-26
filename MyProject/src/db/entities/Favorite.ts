import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { User } from "./User";

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  bookId: number;

  @Column({ type: 'varchar', nullable: false})
  userId: number;

  @ManyToOne(() => Book)
  @JoinColumn()
  book: Book;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
