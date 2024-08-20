import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import OauthAccounts from "./OauthAccounts.entity";
@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

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

  @OneToOne(() => OauthAccounts, { nullable: true })
  mal_account: OauthAccounts;
}

export default Users;
