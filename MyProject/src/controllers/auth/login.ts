import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import db from '../../db';
import type { User } from '../../db/entity/User';
import { generateAccessToken } from '../../utils/generateAccessToken';
import { getError } from '../../utils/getCustomError';
import { getHashedPassword } from '../../utils/hashPassword';

type ParamsType = Record<string, never>;
type QueryType = Record<string, never>;
type BodyType = {
  email: string;
  password: string;
};
type ResponseType = {
  currentUser: User;
  accessToken: string;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const loginUser: ControllerType = async (req, res, next) => {
  try {
    const password = getHashedPassword(req.body.password);

    const { email } = req.body;

    const currentUser = await db.userRepository.findOneBy({ email });

    const currentUserPassword = await db.userRepository.createQueryBuilder('user').select('user.password').where('user.email = :email', { email }).getRawOne();

    if (!currentUser) {
      throw getError(StatusCodes.NOT_FOUND, config.errors.email_err);
    }

    if (currentUserPassword.user_password !== password) {
      throw getError(StatusCodes.FORBIDDEN, config.errors.password_err);
    }

    const accessToken = generateAccessToken(currentUser.id);

    delete currentUserPassword.user_password;

    res.json({
      currentUser,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
