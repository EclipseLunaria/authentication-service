import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import OauthAccounts from "./OauthAccounts.entity";
import ConnectedAccounts from "./ConnectedAccounts.entity";
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
  updated_at: Date;

  @Column({ length: 255 })
  password_hash: string;

  @OneToOne(() => OauthAccounts, (OauthAccount) => OauthAccount.user, {
    nullable: true,
  })
  oauth_account: OauthAccounts;

  @OneToOne(() => ConnectedAccounts, { nullable: true })
  mal_account: ConnectedAccounts;
}

export default Users;
