import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import db from "../../db";
import * as yup from "yup";
import { User } from "../../db/entity/User";
import { generateAccessToken } from "../../utils/generateAccessToken";
import { getError } from "../../utils/getCustomError";
import { getHashedPassword } from "../../utils/hashPassword";
import { getErrorsArray } from "../../utils/createErrorsArray";

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

type ControllerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const registrateUser: ControllerType = async function (req, res, next) {
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

    const newUser = await db.userRepository.save(user);

    const accessToken = generateAccessToken(newUser.id);

    res.json({ newUser, accessToken });
  } catch (error) {
    // console.log('owibka')
    // if (error instanceof yup.ValidationError) {
    //   const yupErrors = getErrorsArray(error);
    //   return next(
    //     getError(
    //       StatusCodes.INTERNAL_SERVER_ERROR,
    //       "Validation error!",
    //       yupErrors
    //     )
    //   );
    // }

    next(error);
  }
};