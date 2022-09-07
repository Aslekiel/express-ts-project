import { Handler } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import db from "../../db";
import { User } from "../../db/entity/User";
import { getError } from "../../utils/getCustomError";
import { getHashedPassword } from "../../utils/hashPassword";


export const registrateUser: Handler = async function (
  req,
  res,
  next
) {
  try {

    const registeredEmail = await db.userRepository.findOneBy({
      email: req.body.email,
    });

    if (registeredEmail) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.registration);
    }

    const hashedPassword = getHashedPassword(req.body.password);

    const user = new User();

    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = hashedPassword;
    user.dob = new Date(req.body.dob);

    const newUser = await db.userRepository.save(user)

    res.json(newUser);
  } catch (error) {
    next(error)
  }
};
