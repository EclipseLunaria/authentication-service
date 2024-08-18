import { DataSourceOptions } from "typeorm";
import { Users, OauthAccounts, ConnectedAccounts } from "./entities";

const ormConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Users, OauthAccounts, ConnectedAccounts],
  subscribers: [],
  migrations: [],
};

export default ormConfig;
