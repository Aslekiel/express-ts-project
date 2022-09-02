import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "a9965211421149965A",
  database: "users",
  entities: [User],
  synchronize: true,
  logging: false,
});
