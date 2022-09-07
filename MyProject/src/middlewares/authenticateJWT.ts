import { NextFunction, Request, Response, Handler } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { getError } from "../utils/getCustomError";
import db from "../db";

export const authenticateJWT: Handler = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw getError(StatusCodes.UNAUTHORIZED, process.env.PASS_AUTO);
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(token, process.env.TOKEN_SECRET) as {
      id: number;
    };

    const currentUser = await db.userRepository.findOneBy({
      id: payload.id,
    });

    if (!currentUser) {
      throw getError(StatusCodes.FORBIDDEN, process.env.TOKEN_ERR);
    }

    req.user = currentUser;

    next();
  } catch (err) {
    next(err);
  }
};
