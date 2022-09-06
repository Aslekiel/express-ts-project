import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../../DataSource";
import { User } from "../../entity/User";
import { getError } from "../../utils/utils";

const userRepository = AppDataSource.getRepository(User);

export const checkUser = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const foundUser = await userRepository.findOneBy({ id: req.body.id });

    if (!foundUser) {
      throw getError(StatusCodes.BAD_REQUEST, "No such user found!");
    }

    res.json(foundUser);
  } catch (error) {
    next(error);
  }
};
