import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import config from '../../config';
import { Cart } from '../../db/entities/Cart';

export const addBooksToCart: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository.findOne({ relations: { cart: true }, where: { id: +id } });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const { bookId } = req.body;

    const book = await db.books.findOneBy({ id: bookId });

    const cart = new Cart();
    cart.books = book;
    cart.user = user;

    await db.cart.save(cart);

    const userCarts = await db.cart.find({ where: { userId: user.id } });

    res.json(userCarts);
  } catch (error) {
    next(error);
  }
};
