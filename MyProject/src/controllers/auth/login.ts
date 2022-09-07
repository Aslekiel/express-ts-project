import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../../db";
import { generateAccessToken } from "../../utils/generateAccessToken";
import { getError } from "../../utils/getCustomError";
import { getHashedPassword } from "../../utils/hashPassword";

type ParamsType = Record<string, never>;

type QueryType = Record<string, never>;

type BodyType = {
  email: string;
  password: string;
};

type ResponseType = {
  accessToken: string;
};

type ControllerType = RequestHandler<ParamsType, ResponseType, BodyType, QueryType>;

export const loginUser: ControllerType = async (req, res, next) => {
  try {
    const password = getHashedPassword(req.body.password);

    const { email } = req.body;

    const currentUser = await db.userRepository.findOneBy({
      email,
      password,
    });

    if (!currentUser) {
      throw getError(StatusCodes.FORBIDDEN, process.env.LOGIN_ERR);
    }

    const accessToken = generateAccessToken(currentUser.id, "1800s");

    res.json({
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};
