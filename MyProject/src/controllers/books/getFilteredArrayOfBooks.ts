import type { Handler } from 'express';
import db from '../../db';

export const getFilteredArrayOfBooks: Handler = async (req, res, next) => {
  try {
    const filters = req.body;

    const books = await db.books.createQueryBuilder('books')
      .innerJoinAndSelect('books.genres', 'genres', 'genres.id IN (:...filters)', { filters })
      .getMany();

    res.json({ books });
  } catch (error) {
    next(error);
  }
};
