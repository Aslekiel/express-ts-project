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

    const findBook = await db.books.findOneBy({ id: bookId });

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

      const userBookRating = await db.rating.findOne({ where: { bookId, userId: user.id } });

      return res.json({ bookId: userBookRating.bookId, grade: userBookRating.grade });
    }

    const rating = new Rating();
    rating.book = findBook;
    rating.user = user;
    rating.grade = grade;

    await db.rating.save(rating);

    const userBookRating = await db.rating.findOne({ where: { bookId, userId: user.id } });

    res.json({ bookId: userBookRating.bookId, grade: userBookRating.grade });
  } catch (error) {
    next(error);
  }
};
