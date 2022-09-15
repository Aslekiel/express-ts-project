import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import db from '../../db';
import { getError } from '../../utils/getCustomError';

export const checkUser: Handler = async (req, res, next) => {
  try {
    const id = req.body.id;

    const user = await db.userRepository.findOneBy({ id: +id });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};
