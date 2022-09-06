import express from "express";

import { deleteUser } from "../controllers/user/delete";
import { editUser } from "../controllers/user/edit";
import { checkUser } from "../controllers/user/findOne";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { validateSchema } from "../middlewares/validateSchema";
import { userSchema } from "../schemas/userSchema";

const userRouter = express.Router();

userRouter.use(authenticateJWT);

userRouter.get("/user", validateSchema(userSchema), checkUser);

userRouter.put("/user", validateSchema(userSchema), editUser);

userRouter.delete("/user", validateSchema(userSchema), deleteUser);

export default userRouter;
