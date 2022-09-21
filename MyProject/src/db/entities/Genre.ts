import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  name: string;
}
