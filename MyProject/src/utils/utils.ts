import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
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

    jwt.verify(token, process.env.TOKEN_SECRET, (err: any) => {
      if (err) {
        throw getError(StatusCodes.FORBIDDEN, "Invalid token!");
      }

      next();
    });
  } catch (err) {
    next(err);
  }
};

export const generateAccessToken = (
  email: string,
  password: string,
  time: string
) => {
  return jwt.sign({ email, password }, process.env.TOKEN_SECRET, {
    expiresIn: time,
  });
};

export const getError = (status: number, message: string) => {
  const error: any = new Error(message);
  error.localData = {
    status,
    message,
  };

  return error;
};
