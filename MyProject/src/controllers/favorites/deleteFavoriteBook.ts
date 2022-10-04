import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Favorite } from '../../db/entities/Favorite';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import config from '../../config';

export const deleteFavoriteBook: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository
      .findOne({ relations: { favorites: true }, where: { id: +id } });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const { bookId } = req.body;

    await db.favorite
      .createQueryBuilder()
      .delete()
      .from(Favorite)
      .where('userId = :id', { id: user.id })
      .andWhere('bookId = :bookId', { bookId })
      .execute();

    const book = await db.books.findOne({ where: { id: bookId } });

    res.json(book.id);
  } catch (error) {
    next(error);
  }
};
