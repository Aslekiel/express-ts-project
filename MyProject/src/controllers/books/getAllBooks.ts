import type { Book } from 'db/entities/Book';
import type { RequestHandler } from 'express';
import db from '../../db';

type ParamsType = Record<string, never>;
type ResponseType = {
  books: Book[];
  count: number;
};
type BodyType = Record<string, never>;
type QueryType = {
  page: string;
  limit: string;
  search: string;
  genre: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getAllBooks: ControllerType = async (req, res, next) => {
  try {
    const { page, limit, search, genre, minPrice, maxPrice, sortBy } = req.query;

    const currentPage = +page || 1;
    const currentLimit = +limit || null;
    let genres = [];

    const findBooks = db.books.createQueryBuilder('books');

    if (genre) {
      genres = genre.split(',');
      findBooks.innerJoinAndSelect('books.genres', 'genres', 'genres.id IN (:...genres)', { genres });
    }

    if (search) {
      const searchTerm = `%${search}%`;
      findBooks.where('books.title ILIKE :searchTerm OR books.author ILIKE :searchTerm', { searchTerm });
    }

    if (minPrice) {
      findBooks.andWhere('books.price >= :minPrice', { minPrice });
    }

    if (maxPrice) {
      findBooks.andWhere('books.price <= :maxPrice', { maxPrice });
    }

    if (sortBy) {
      findBooks.orderBy(`books.${sortBy}`, 'ASC');
    }

    const books = await findBooks
      .take(currentLimit)
      .skip((currentPage - 1) * currentLimit)
      .getManyAndCount();

    res.json({ books: books[0], count: books[1] });
  } catch (error) {
    next(error);
  }
};
