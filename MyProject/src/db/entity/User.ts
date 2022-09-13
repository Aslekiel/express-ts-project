import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

// eslint-disable-next-line max-len
// fullname: yup.string().test('is-full-name', 'Please enter both your first and last name', (value) => {
//   const nameArr = value.split(' ');
//   return nameArr.length >= 2;
// }),
