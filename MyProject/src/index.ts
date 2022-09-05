import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { AppDataSource } from "./DataSource";
import authRouter from "./routers/auth";
import userRouter from "./routers/user";
import { errorHandler } from "./errorHandler/errorHandler";
import { authenticateJWT } from "./utils/utils";

const urlencodedParser = bodyParser.urlencoded({ extended: false });
const PORT = 3000;

dotenv.config();

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use("/api", urlencodedParser, authRouter);
    app.use("/api", urlencodedParser, authenticateJWT, userRouter);

    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log("Server start");
    });
  })
  .catch((error) => console.log(error));
