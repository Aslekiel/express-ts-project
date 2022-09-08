import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import db from "../../db";
import { User } from "../../db/entity/User";
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
  currentUser: User;
  accessToken: string;
};

type ControllerType = RequestHandler<
  ParamsType,
  ResponseType,
  BodyType,
  QueryType
>;

export const loginUser: ControllerType = async (req, res, next) => {
  try {
    const password = getHashedPassword(req.body.password);

    const { email } = req.body;

    const currentUser = await db.userRepository.findOneBy({ email });

    if (!currentUser) {
      throw getError(StatusCodes.NOT_FOUND, "User с таким email не найден!");
    }

    if (currentUser.password !== password) {
      throw getError(StatusCodes.FORBIDDEN, "Неправиьно введен пароль!");
    }

    const accessToken = generateAccessToken(currentUser.id);

    res.json({
      currentUser,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};