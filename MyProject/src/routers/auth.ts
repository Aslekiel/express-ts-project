import express from "express";

import { loginUser } from "../controllers/auth/login";
import { registrateUser } from "../controllers/auth/registrate";
import { validateSchema } from "../middlewares/validateSchema";
import { authLoginSchema } from "../schemas/authLoginSchema";
import { authRegistrationSchema } from "../schemas/authRegistrationSchema";

const authRouter = express.Router();

authRouter.post("/registration", validateSchema(authRegistrationSchema), registrateUser);

authRouter.post("/login", validateSchema(authLoginSchema), loginUser);

export default authRouter;
