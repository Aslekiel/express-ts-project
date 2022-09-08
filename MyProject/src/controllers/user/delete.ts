import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import db from '../../db';
import { getError } from '../../utils/getCustomError';

export const deleteUser: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const foundUser = await db.userRepository.findOneBy({ id: +id });

    if (!foundUser) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    await db.userRepository.remove(foundUser);
    return res.json('User has been deleted');
  } catch (error) {
    next(error);
  }
};
