import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Users } from "./Users.entity";

@Entity()
export class ConnectedAccounts {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Users)
  user: Users;

  @Column()
  provider: string;

  @Column()
  provider_id: string;

  @Column()
  access_token: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ nullable: true })
  token_expires_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default ConnectedAccounts;
