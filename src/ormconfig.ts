import { DataSourceOptions } from "typeorm";

const ormConfig: DataSourceOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [],
  subscribers: [],
  migrations: [],
};

export default ormConfig;
