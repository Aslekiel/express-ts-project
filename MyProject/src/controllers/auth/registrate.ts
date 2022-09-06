import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../../DataSource";
import { User } from "../../entity/User";
import { getError, getHashedPassword } from "../../utils/utils";

const userRepository = AppDataSource.getRepository(User);

export const registrateUser = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const registeredEmail = await userRepository.findOneBy({
      email: req.body.email,
    });
    if (registeredEmail) {
      throw getError(
        StatusCodes.BAD_REQUEST,
        "This email is already registered!"
      );
    }

    const hashedPassword = getHashedPassword(req.body.password);

    const user = new User();
    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.password = hashedPassword;
    user.dob = req.body.dob;

    res.json(await userRepository.save(user));
  } catch (error) {
    next(error);
  }
};
