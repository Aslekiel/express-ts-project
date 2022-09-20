import { AppDataSource } from './DataSource';
import { User } from './entities/User';

export default { userRepository: AppDataSource.getRepository(User) };
