import type { Handler } from 'express';
import db from '../../db';

export const getAllBooks: Handler = async (req, res, next) => {
  try {
    const books = await db.books.find({ relations: { genres: true } });

    res.json({ books });
  } catch (error) {
    next(error);
  }
};
