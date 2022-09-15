import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import db from '../../db';
import { getError } from '../../utils/getCustomError';

export const editPassword: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository.findOneBy({ id: +id });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, process.env.NO_USER);
    }

    // eslint-disable-next-line no-console
    console.log(req.body);
    user.password = req.body.password;

    const editUser = await db.userRepository.save(user);

    delete user.password;

    res.json(editUser);
  } catch (error) {
    next(error);
  }
};
