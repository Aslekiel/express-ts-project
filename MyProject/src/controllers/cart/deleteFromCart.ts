import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import config from '../../config';
import { Cart } from '../../db/entities/Cart';

export const deleteFromCart: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository.findOneBy({ id: +id });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const { bookId } = req.body;

    await db.cart
      .createQueryBuilder()
      .delete()
      .from(Cart)
      .where('userId = :id', { id: user.id })
      .andWhere('bookId = :bookId', { bookId })
      .execute();

    const cart = await db.cart.find({ where: { userId: user.id } });

    const booksIdsFromCart = cart.map((book) => book.bookId);

    if (cart.length > 0) {
      const books = await db.books.createQueryBuilder('books')
        .where('books.id IN (:...booksIdsFromCart)', { booksIdsFromCart })
        .getMany();

      return res.json({ books, user: { cart } });
    }

    const books = [];

    res.json({ books, user: { cart } });
  } catch (error) {
    next(error);
  }
};
