import express from 'express';

import { findCommentatorsById } from '../controllers/user/findAnotherUserById';
import { deleteUser } from '../controllers/user/delete';
import { editPassword } from '../controllers/user/editPassword';
import { editUserInfo } from '../controllers/user/editUserInfo';
import { findUser } from '../controllers/user/findOne';
import { uploadAvatar } from '../controllers/user/uploadAvatar';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { validateSchema } from '../middlewares/validateSchema';
import { userEditInfoSchema } from '../schemas/userEditInfoSchema';
import { userEditPasswordSchema } from '../schemas/userEditPasswordSchema';
import { userSchema } from '../schemas/userSchema';

const userRouter = express.Router();

userRouter.post('/find-another', findCommentatorsById);

userRouter.use(authenticateJWT);

userRouter.get('/', validateSchema(userSchema), findUser);
userRouter.patch('/password', validateSchema(userEditPasswordSchema), editPassword);
userRouter.patch('/info', validateSchema(userEditInfoSchema), editUserInfo);
userRouter.delete('/', validateSchema(userSchema), deleteUser);
userRouter.post('/upload', uploadAvatar);

export default userRouter;
