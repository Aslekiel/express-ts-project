import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  title: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  author: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  description: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  logo: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  rating: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  comments: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  price: string;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  dateOfIssue: string;
}
