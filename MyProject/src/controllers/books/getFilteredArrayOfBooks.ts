import type { Handler } from 'express';
import db from '../../db';

export const getFilteredArrayOfBooks: Handler = async (req, res, next) => {
  try {
    const filters = req.body;

    for (let i = 0; i < filters.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      // const books = await db.books.find({
      //   relations: { genres: true },
      //   where: { genres: { name: filters[i] } },
      // });

      // eslint-disable-next-line no-await-in-loop
      // const books = await db.books.createQueryBuilder('books')
      //   .leftJoinAndSelect('books.genres', 'genres')
      //   .where('genres.name = :name', { name: filters[i] }).getMany();

      // // eslint-disable-next-line no-console
      // console.log(books);

      // res.json({ books });
    }

    const books = await db.books.createQueryBuilder('books')
      .innerJoin('books.genres', 'genres', 'genres.name IN (:...filters)', { filters }).getMany();

    // eslint-disable-next-line no-console
    console.log(books);

    res.json({ books });
  } catch (error) {
    next(error);
  }
};
