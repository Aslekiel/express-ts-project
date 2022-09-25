import express from 'express';

import authRouter from './auth';
import booksRouter from './booksRouter';
import cartRouter from './cartRouter';
import userRouter from './user';

const mainRouter = express();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/books', booksRouter);
mainRouter.use('/cart', cartRouter);

export default mainRouter;
