import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import config from '../../config';

export const getFavoriteBooks: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository.findOneBy({ id: +id });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const userFavorites = await db.favorite.find({ where: { userId: user.id } });

    const booksIdsFromFavorite = userFavorites.map((book) => book.bookId);

    if (userFavorites.length > 0) {
      const books = await db.books.createQueryBuilder('books')
        .where('books.id IN (:...booksIdsFromFavorite)', { booksIdsFromFavorite })
        .getMany();

      return res.json(books);
    }

    const books = [];

    res.json(books);
  } catch (error) {
    next(error);
  }
};
