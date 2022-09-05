import express from "express";

import { checkUser } from "../controllers/check";
import { deleteUser } from "../controllers/delete";
import { editUser } from "../controllers/edit";
import { validateSchema } from "../middlewares/validateSchema";
import { userSchema } from "../schemas/userSchema";

const userRouter = express.Router();

userRouter.get("/user", checkUser);

userRouter.put("/user", validateSchema(userSchema), editUser);

userRouter.delete("/user", deleteUser);

export default userRouter;
