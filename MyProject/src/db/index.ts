import { AppDataSource } from "./DataSource";
import { User } from "./entity/User";

export default { userRepository: AppDataSource.getRepository(User) };