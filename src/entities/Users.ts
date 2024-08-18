import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column({ length: 255 })
  password_hash: string;

  @Column({ length: 255 })
  password_salt: string;
}

export default Users;
