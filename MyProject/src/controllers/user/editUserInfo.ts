import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import db from '../../db';
import { getError } from '../../utils/getCustomError';

export const editUserInfo: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository.findOneBy({ id: +id });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, process.env.NO_USER);
    }

    const registeredEmail = await db.userRepository.findOneBy({
      email: req.body.email,
    });

    if (registeredEmail.email && id !== registeredEmail.id) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.registration_err);
    }

    user.fullname = req.body.fullname;
    user.email = req.body.email;

    const editUser = await db.userRepository.save(user);

    res.json(editUser);
  } catch (error) {
    next(error);
  }
};
