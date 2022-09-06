import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../../DataSource";
import { User } from "../../entity/User";
import { getError } from "../../utils/utils";

const userRepository = AppDataSource.getRepository(User);

export const editUser = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const foundUser = await userRepository.findOneBy({ id: req.body.id });

    if (!foundUser) {
      throw getError(StatusCodes.BAD_REQUEST, "No such user found!");
    }

    foundUser.name = req.body.name;
    foundUser.lastname = req.body.lastname;
    foundUser.email = req.body.email;
    foundUser.password = req.body.password;
    foundUser.dob = req.body.dob;

    const editUser = await userRepository.save(foundUser);

    res.json(editUser);
  } catch (error) {
    next(error);
  }
};
