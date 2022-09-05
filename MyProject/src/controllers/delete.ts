import { Request, Response } from "express";
import { AppDataSource } from "../DataSource";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export const deleteUser = async function (req: Request, res: Response) {
  try {
    const foundUser = await userRepository.findOneBy({ id: req.body.id });
    const removeUser = await userRepository.remove(foundUser);
    res.json(removeUser);
  } catch (error) {
    res.sendStatus(500).json(error);
  }
};
