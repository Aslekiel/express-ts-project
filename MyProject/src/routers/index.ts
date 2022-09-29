import express from 'express';

import authRouter from './auth';
import booksRouter from './booksRouter';
import cartRouter from './cartRouter';
import commentRouter from './commentRouter';
import favoriteRouter from './favoriteRouter';
import ratingRouter from './ratingRouter';
import userRouter from './user';

const mainRouter = express();

mainRouter.use('/auth', authRouter);
mainRouter.use('/user', userRouter);
mainRouter.use('/books', booksRouter);
mainRouter.use('/cart', cartRouter);
mainRouter.use('/favorite', favoriteRouter);
mainRouter.use('/rating', ratingRouter);
mainRouter.use('/comment', commentRouter);

export default mainRouter;
