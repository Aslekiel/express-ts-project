import { Handler } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../../db";
import { getError } from "../../utils/getCustomError";

export const findUser: Handler = async function (req, res, next) {
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