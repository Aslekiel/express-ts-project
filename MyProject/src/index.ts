import { AppDataSource } from "./db/DataSource";
import app from "./app";
import config from "./config";
import types from "./types";


(async () => {

  await AppDataSource.initialize().catch((error) => console.log(error))

  app.listen(config.port, () => {
    console.log("Server start");
  });

})()
