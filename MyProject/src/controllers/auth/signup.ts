import type { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as yup from 'yup';
import config from '../../config';
import db from '../../db';
import { User } from '../../db/entity/User';
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
  user: User;
  accessToken: string;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const signUpUser: ControllerType = async (req, res, next) => {
  try {
    const registeredEmail = await db.userRepository.findOneBy({
      email: req.body.email,
    });

    if (registeredEmail) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.registration_err);
    }

    const hashedPassword = getHashedPassword(req.body.password);

    const newUser = new User();

    newUser.email = req.body.email;
    newUser.password = hashedPassword;

    const user = await db.userRepository.save(newUser);

    const accessToken = generateAccessToken(user.id);

    delete user.password;

    res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
};
