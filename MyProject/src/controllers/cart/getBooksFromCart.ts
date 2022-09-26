import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import config from '../../config';

export const getBooksFromCart: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository.findOneBy({ id: +id });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const findCart = await db.cart
      .createQueryBuilder('cart')
      .innerJoinAndSelect('cart.books', 'books')
      .innerJoin('cart.user', 'user')
      .where({ id: user.id })
      .getOne();

    const books = findCart.books;

    res.json({ books });
  } catch (error) {
    next(error);
  }
};
