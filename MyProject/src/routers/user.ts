import express from "express";

import { deleteUser } from "../controllers/user/delete";
import { editUser } from "../controllers/user/edit";
import { findUser } from "../controllers/user/findOne";
import { authenticateJWT } from "../middlewares/authenticateJWT";
import { validateSchema } from "../middlewares/validateSchema";
import { userSchema } from "../schemas/userSchema";

const userRouter = express.Router();

userRouter.use(authenticateJWT);

userRouter.get("/:id", validateSchema(userSchema), findUser);
userRouter.patch("/:id", validateSchema(userSchema), editUser);
userRouter.delete("/:id", validateSchema(userSchema), deleteUser);

export default userRouter;
