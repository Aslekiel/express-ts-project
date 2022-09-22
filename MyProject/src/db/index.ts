import { AppDataSource } from './DataSource';
import { Book } from './entities/Book';
import { Genre } from './entities/Genre';
import { User } from './entities/User';

export default {
  userRepository: AppDataSource.getRepository(User),
  books: AppDataSource.getRepository(Book),
  genre: AppDataSource.getRepository(Genre),
};
