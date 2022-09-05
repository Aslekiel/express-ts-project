import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../DataSource";
import { User } from "../entity/User";
import { generateAccessToken, getError } from "../utils/utils";

const userRepository = AppDataSource.getRepository(User);

export const loginUser = async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;

    const currentUser = await userRepository.findOneBy({
      email: email,
      password: password,
    });

    if (!currentUser) {
      throw getError(
        StatusCodes.FORBIDDEN,
        "Login or password entered incorrectly!"
      );
    }

    const accessToken = generateAccessToken(email, password, "1800s");

    res.json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
