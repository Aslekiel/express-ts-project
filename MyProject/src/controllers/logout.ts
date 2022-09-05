import { AppDataSource } from "../DataSource";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);

export const logout = async function (req: any, res: any, next: any) {};
