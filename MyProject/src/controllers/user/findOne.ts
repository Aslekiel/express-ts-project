import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import db from '../../db';
import { getError } from '../../utils/getCustomError';

export const findUser: Handler = async (req, res, next) => {
  try {
    const id = req.user.email;

    const foundUser = await db.userRepository.findOneBy({ id: +id });

    if (!foundUser) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    res.json(foundUser);
  } catch (error) {
    next(error);
  }
};
