import { Request, Response } from "express";
import { AppDataSource } from "../DataSource";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export const editUser = async function (req: Request, res: Response) {
  try {
    const foundUser = await userRepository.findOneBy({ id: req.body.id });

    foundUser.name = req.body.name;
    foundUser.lastname = req.body.lastname;
    foundUser.email = req.body.email;
    foundUser.password = req.body.password;
    foundUser.dob = req.body.dob;

    const editUser = await userRepository.save(foundUser);

    res.json(editUser);
  } catch (error) {
    res.sendStatus(500).json(error);
  }
};
