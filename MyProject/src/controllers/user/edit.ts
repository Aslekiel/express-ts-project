import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../../db";
import { getError } from "../../utils/getCustomError";

export const editUser = async function (
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

    foundUser.name = req.user.name;
    foundUser.lastname = req.user.lastname;
    foundUser.email = req.user.email;
    foundUser.password = req.user.password;
    foundUser.dob = req.user.dob;

    const editUser = await db.userRepository.save(foundUser);

    res.json(editUser);
  } catch (error) {
    next(error);
  }
};
