import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import OauthAccounts from "./OauthAccounts.entity";
import ConnectedAccounts from "./ConnectedAccounts.entity";
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

  @OneToOne(() => OauthAccounts, { nullable: true })
  oauth_account: OauthAccounts;

  @OneToOne(() => ConnectedAccounts, { nullable: true })
  mal_account: ConnectedAccounts;
}

export default Users;
