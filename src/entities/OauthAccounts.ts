import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class OauthAccounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

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

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  updated_at: Date;
}

export default OauthAccounts;
