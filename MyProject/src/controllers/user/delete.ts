import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../../db";
import { getError } from "../../utils/getCustomError";

export const deleteUser = async function (
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

    await db.userRepository.remove(foundUser);
    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};
