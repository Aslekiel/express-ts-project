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

    const userCarts = await db.cart.find({ where: { userId: user.id } });

    const booksIdsFromCart = userCarts.map((book) => book.bookId);

    if (userCarts.length > 0) {
      const books = await db.books.createQueryBuilder('books')
        .where('books.id IN (:...booksIdsFromCart)', { booksIdsFromCart })
        .getMany();

      return res.json({ books });
    }

    const books = [];

    res.json({ books });
  } catch (error) {
    next(error);
  }
};
