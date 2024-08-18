import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Users } from "./Users";

@Entity()
export class ConnectedAccounts {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  user: Users;

  @Column()
  provider: string;

  @Column()
  provider_id: string;

  @Column()
  access_token: string;

  @Column()
  refresh_token: string;

  @Column()
  token_expires_at: Date;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default ConnectedAccounts;
