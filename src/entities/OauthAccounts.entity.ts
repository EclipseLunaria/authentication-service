import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Users } from ".";

@Entity()
export class OauthAccounts {
  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  provider: string;

  @Column()
  provider_id: string;

  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ nullable: true })
  token_expires_at: Date;

  @Column({ nullable: true })
  refresh_token_expires_at: Date;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}

export default OauthAccounts;
