import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import db from '../../db';
import { getError } from '../../utils/getCustomError';

export const editUser: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const foundUser = await db.userRepository.findOneBy({ id: +id });

    if (!foundUser) {
      throw getError(StatusCodes.BAD_REQUEST, process.env.NO_USER);
    }

    const registeredEmail = await db.userRepository.findOneBy({
      email: req.body.email,
    });

    if (registeredEmail) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.registration_err);
    }

    foundUser.name = req.body.name;
    foundUser.lastname = req.body.lastname;
    foundUser.email = req.body.email;
    foundUser.password = req.body.password;
    foundUser.dob = new Date(req.body.dob);

    const editUser = await db.userRepository.save(foundUser);

    delete foundUser.password;

    res.json(editUser);
  } catch (error) {
    next(error);
  }
};
