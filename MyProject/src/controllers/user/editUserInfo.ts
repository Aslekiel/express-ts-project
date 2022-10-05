import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import db from '../../db';
import { getError } from '../../utils/getCustomError';

export const editUserInfo: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const findUser = await db.userRepository.findOneBy({ id: +id });

    if (!findUser) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const registeredEmail = await db.userRepository.findOneBy({
      email: req.body.email,
    });

    if (registeredEmail?.email && id !== registeredEmail.id) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.registration_err);
    }

    findUser.fullname = req.body.fullname;
    findUser.email = req.body.email;

    await db.userRepository.save(findUser);

    const user = await db.userRepository
      .findOne(
        {
          relations: { cart: true, favorites: true, ratings: true },
          where: { id },
        },
      );

    res.json({ user });
  } catch (error) {
    next(error);
  }
};
