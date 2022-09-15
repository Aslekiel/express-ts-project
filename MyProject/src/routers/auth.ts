import express from 'express';
import { checkUser } from '../controllers/auth/checkUser';

import { loginUser } from '../controllers/auth/login';
import { signUpUser } from '../controllers/auth/signup';

import { validateSchema } from '../middlewares/validateSchema';
import { authCheckUserSchema } from '../schemas/authCheckUserSchema';
import { authLoginSchema } from '../schemas/authLoginSchema';
import { authSignUpSchema } from '../schemas/authSignUpSchema';

const authRouter = express.Router();

authRouter.post('/signup', validateSchema(authSignUpSchema), signUpUser);
authRouter.post('/login', validateSchema(authLoginSchema), loginUser);
authRouter.post('/', validateSchema(authCheckUserSchema), checkUser);

export default authRouter;
