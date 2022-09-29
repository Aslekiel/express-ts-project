import { AppDataSource } from './DataSource';
import { Book } from './entities/Book';
import { Cart } from './entities/Cart';
import { Comment } from './entities/Comment';
import { Favorite } from './entities/Favorite';
import { Genre } from './entities/Genre';
import { Rating } from './entities/Rating';
import { User } from './entities/User';

export default {
  userRepository: AppDataSource.getRepository(User),
  books: AppDataSource.getRepository(Book),
  genre: AppDataSource.getRepository(Genre),
  cart: AppDataSource.getRepository(Cart),
  favorite: AppDataSource.getRepository(Favorite),
  rating: AppDataSource.getRepository(Rating),
  comment: AppDataSource.getRepository(Comment),
};
