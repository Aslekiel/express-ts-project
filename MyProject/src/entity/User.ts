import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20 })
  name: string;

  @Column({ type: "varchar", length: 30 })
  lastname: string;

  @Column({ type: "varchar", length: 20 })
  email: string;

  @Column({ type: "varchar", length: 50 })
  password: string;

  @Column({ type: "varchar", length: 20 })
  dob: string;
}
