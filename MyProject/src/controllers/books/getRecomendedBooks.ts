import type { Handler } from 'express';
import db from '../../db';

export const getRecomendedBooks: Handler = async (req, res, next) => {
  try {
    const { id } = req.body;

    const book = await db.books.findOne({ relations: { genres: true }, where: { id } });
    // const genres = await db.genre.find({ where: { id } });

    const genresIds = book.genres.map((genre) => genre.id);

    const findBooks = await db.books.createQueryBuilder('books')
      .innerJoinAndSelect('books.genres', 'genres', 'genres.id IN (:...genresIds)', { genresIds })
      .getMany();

    const books = findBooks.filter((book) => book.id !== id).slice(0, 4);

    res.json({ books });
  } catch (error) {
    next(error);
  }
};
