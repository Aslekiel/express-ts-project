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
  name: string;
  lastname: string;
  email: string;
  password: string;
  dob: Date;
};
type ResponseType = {
  newUser: User;
  accessToken: string;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const registrateUser: ControllerType = async (req, res, next) => {
  try {
    const registeredEmail = await db.userRepository.findOneBy({
      email: req.body.email,
    });

    if (registeredEmail) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.registration_err);
    }

    const hashedPassword = getHashedPassword(req.body.password);

    const user = new User();

    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = hashedPassword;
    user.dob = new Date(req.body.dob);

    const newUser = await db.userRepository.save(user);

    const accessToken = generateAccessToken(newUser.id);

    delete user.password;

    res.json({ newUser, accessToken });
  } catch (error) {
    next(error);
  }
};
