import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import config from '../../config';
import db from '../../db';
import { getError } from '../../utils/getCustomError';

export const checkUser: Handler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const payload = jwt.verify(token, process.env.TOKEN_SECRET) as {
      id: number;
    };

    const user = await db.userRepository.findOneBy({ id: payload.id });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
};
