import express from 'express';

import authRouter from './auth';
import userRouter from './user';

const mainRouter = express();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);

export default mainRouter;
