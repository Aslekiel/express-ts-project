import { Handler } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import db from "../../db";
import { getError } from "../../utils/getCustomError";

export const editUser: Handler = async function (req, res, next) {
  try {
    const id = req.params.id;

    const foundUser = await db.userRepository.findOneBy({ id: +id });

    if (!foundUser) {
      throw getError(StatusCodes.BAD_REQUEST, process.env.NO_USER);
    }

    const registeredEmail = await db.userRepository.findOneBy({
      email: req.body.email,
    });

    if (registeredEmail) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.registration);
    }

    foundUser.name = req.user.name;
    foundUser.lastname = req.user.lastname;
    foundUser.email = req.user.email;
    foundUser.password = req.user.password;
    foundUser.dob = new Date(req.body.dob);

    const editUser = await db.userRepository.save(foundUser);

    res.json({ editUser });
  } catch (error) {
    next(error);
  }
};