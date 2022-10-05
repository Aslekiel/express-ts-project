import type { Book } from 'db/entities/Book';
import type { RequestHandler } from 'express';
import db from '../../db';

type ParamsType = Record<string, never>;
type ResponseType = {
  books: Book[];
  serviceInfo: ServiceInfoType;
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

type ServiceInfoType = {
  page: number;
  limit: number;
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
  totalBooks: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const getAllBooks: ControllerType = async (req, res, next) => {
  try {
    const { page, limit, search, genre, minPrice, maxPrice, sortBy } = req.query;

    const currentPage = +page || 1;
    const currentLimit = +limit || null;
    const totalBooks = await db.books.findAndCount();
    const totalPages = Math.ceil(totalBooks[1] / currentLimit);
    const prevPage = currentPage - 1 > 0 ? currentPage - 1 : null;
    const nextPage = currentPage + 1 <= totalPages ? currentPage + 1 : null;
    const hasPrevPage = !!prevPage;
    const hasNextPage = !!nextPage;

    const serviceInfo = {
      page: currentPage,
      limit: currentLimit,
      totalBooks: totalBooks[1],
      totalPages,
      hasPrevPage,
      prevPage,
      hasNextPage,
      nextPage,
    };

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
      .getMany();

    res.json({ books, serviceInfo });
  } catch (error) {
    next(error);
  }
};
