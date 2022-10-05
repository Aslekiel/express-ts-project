import type { Handler } from 'express';
import db from '../../db';

export const getRecomendedBooks: Handler = async (req, res, next) => {
  try {
    const { id } = req.body;

    const book = await db.books
      .findOne({
        relations: { genres: true, comments: true },
        where: { id },
      });

    const genresIds = book.genres.map((genre) => genre.id);

    const findBooks = await db.books.createQueryBuilder('books')
      .innerJoinAndSelect('books.genres', 'genres', 'genres.id IN (:...genresIds)', { genresIds })
      .getMany();

    const books = findBooks
      .filter((book) => book.id !== id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    res.json(books);
  } catch (error) {
    next(error);
  }
};
