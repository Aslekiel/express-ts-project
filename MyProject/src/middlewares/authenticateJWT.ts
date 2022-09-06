import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { getError } from "../utils/utils";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw getError(StatusCodes.UNAUTHORIZED, "Pass authorization!");
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.TOKEN_SECRET);

    // console.log(req.user);
    // req.user = payload;

    next();
  } catch (err) {
    next(err);
  }
};
