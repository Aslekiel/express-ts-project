import { AppDataSource } from './DataSource';
import { Author } from './entities/Author';
import { Book } from './entities/Book';
import { Genre } from './entities/Genre';
import { User } from './entities/User';

export default {
  userRepository: AppDataSource.getRepository(User),
  books: AppDataSource.getRepository(Book),
  genre: AppDataSource.getRepository(Genre),
  author: AppDataSource.getRepository(Author),
};
