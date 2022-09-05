import { Request, Response } from "express";
import { AppDataSource } from "../DataSource";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export const checkUser = async function (req: Request, res: Response) {
  try {
    const foundUser = await userRepository.findOneBy({ id: req.body.id });

    res.json(foundUser);
  } catch (error) {
    res.sendStatus(500).json(error);
  }
};
