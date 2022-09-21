import express from 'express';

import authRouter from './auth';
import booksRouter from './booksRouter';
import userRouter from './user';

const mainRouter = express();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/books', booksRouter);

export default mainRouter;
