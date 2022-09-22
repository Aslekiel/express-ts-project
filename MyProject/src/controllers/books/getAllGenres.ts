import type { Handler } from 'express';
import db from '../../db';

export const getAllGenres: Handler = async (req, res, next) => {
  try {
    const genres = await db.genre.find();

    res.json({ genres });
  } catch (error) {
    next(error);
  }
};
