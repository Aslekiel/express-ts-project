import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import { getHashedPassword } from '../../utils/hashPassword';

export const editPassword: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const findUser = await db.userRepository.findOneBy({ id: +id });

    if (!findUser) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const oldPassword = getHashedPassword(req.body.oldPassword);
    const currentUserPassword = await db.userRepository.createQueryBuilder('findUser').select('findUser.password').where('findUser.id = :id', { id }).getRawOne();

    if (oldPassword !== currentUserPassword.findUser_password) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.old_password_err);
    }

    const hashedPassword = getHashedPassword(req.body.confirmPassword);

    findUser.password = hashedPassword;

    const user = await db.userRepository.save(findUser);

    delete user.password;

    res.json({ user });
  } catch (error) {
    next(error);
  }
};
