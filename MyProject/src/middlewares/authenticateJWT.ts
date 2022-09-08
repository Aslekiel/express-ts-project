import type { Handler } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { getError } from '../utils/getCustomError';
import db from '../db';
import config from '../config';

export const authenticateJWT: Handler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw getError(StatusCodes.UNAUTHORIZED, config.errors.auth_err);
    }

    const token = authHeader.split(' ')[1];

    const payload = jwt.verify(token, process.env.TOKEN_SECRET) as {
      id: number;
    };

    const currentUser = await db.userRepository.findOneBy({
      id: payload.id,
    });

    if (!currentUser) {
      throw getError(StatusCodes.FORBIDDEN, config.errors.token_err);
    }

    req.user = currentUser;

    next();
  } catch (err) {
    next(err);
  }
};
