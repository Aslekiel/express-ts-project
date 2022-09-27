import type { Handler } from 'express';
import db from '../../db';

export const getBookById: Handler = async (req, res, next) => {
  try {
    const { id } = req.body;

    const book = await db.books.findOne({ where: { id } });

    res.json(book);
  } catch (error) {
    next(error);
  }
};
