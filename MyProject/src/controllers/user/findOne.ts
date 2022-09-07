import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../../db";
import { getError } from "../../utils/getCustomError";

export const findUser = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.user.id;

    const foundUser = await db.userRepository.findOneBy({ id: +id });

    if (!foundUser) {
      throw getError(StatusCodes.BAD_REQUEST, process.env.NO_USER);
    }

    res.json(foundUser);
  } catch (error) {
    next(error);
  }
};
