import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Favorite } from '../../db/entities/Favorite';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import config from '../../config';

export const addFavoriteBook: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository
      .findOne({ relations: { favorites: true }, where: { id: +id } });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const { bookId } = req.body;

    const book = await db.books.findOneBy({ id: bookId });

    const favorite = new Favorite();
    favorite.book = book;
    favorite.user = user;

    await db.favorite.save(favorite);

    const userFavorites = await db.favorite.find({ where: { userId: user.id } });

    res.json({ favorites: userFavorites });
  } catch (error) {
    next(error);
  }
};
