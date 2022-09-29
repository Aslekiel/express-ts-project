import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import db from '../../db';
import { getError } from '../../utils/getCustomError';

export const findAnotherUserById: Handler = async (req, res, next) => {
  try {
    const { anotherUserId } = req.body;

    const anotherUser = await db.userRepository.findOneBy({ id: anotherUserId });

    if (!anotherUser) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    res.json({ avatar: anotherUser.avatar, fullname: anotherUser.fullname });
  } catch (error) {
    next(error);
  }
};
