import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "../config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.host,
  port: +config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  entities: [`${__dirname}/entity/*`],
  synchronize: true,
  logging: false,
});

