import express from "express";

import { loginUser } from "../controllers/login";
import { registrateUser } from "../controllers/registrate";
import { validateSchema } from "../middlewares/validateSchema";
import { userSchema } from "../schemas/userSchema";

const authRouter = express.Router();

authRouter.post("/registration", validateSchema(userSchema), registrateUser);

authRouter.get("/login", loginUser);

export default authRouter;
