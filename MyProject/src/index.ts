import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { AppDataSource } from "./DataSource";
import authRouter from "./routers/auth";
import userRouter from "./routers/user";
import { errorHandler } from "./errorHandler/errorHandler";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const PORT = 3000;

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(urlencodedParser);
    app.use("/api", authRouter);
    app.use("/api", userRouter);

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log("Server start");
    });
  })
  .catch((error) => console.log(error));
