import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Rating } from '../../db/entities/Rating';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import config from '../../config';

export const addRating: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository
      .findOne({ relations: { ratings: true }, where: { id: +id } });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const { bookId, grade } = req.body;

    const book = await db.books.findOneBy({ id: bookId });

    const booksIdsRating = user.ratings.map((rating) => rating.bookId);

    if (booksIdsRating.includes(bookId)) {
      await db.cart
        .createQueryBuilder()
        .update(Rating)
        .set({
          grade: () => `${grade}`,
        })
        .where('userId = :id', { id: user.id })
        .andWhere('bookId = :bookId', { bookId })
        .execute();

      const userBookRating = await db.rating.find({ where: { userId: user.id } });

      return res.json({ ratings: userBookRating });
    }

    const rating = new Rating();
    rating.book = book;
    rating.user = user;
    rating.grade = grade;

    await db.rating.save(rating);

    const userBookRating = await db.rating.find({ where: { userId: user.id } });

    res.json({ ratings: userBookRating });
  } catch (error) {
    next(error);
  }
};
