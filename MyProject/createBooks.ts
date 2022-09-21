import { AppDataSource } from './src/db/DataSource';
import db from './src/db';
import { booksArray } from './books/books';

const genres = [
  'Action & Adventure Fiction',
  'Historical Fiction',
  'Mythology',
  'Fairy Tales',
  'Ancient & Medieval Literature',
];

(async () => {
  // eslint-disable-next-line no-console
  await AppDataSource.initialize().catch((error) => console.log(error));

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];

    const bookGenre = db.genre.create({ name: genre });

    // eslint-disable-next-line no-await-in-loop
    await db.genre.save(bookGenre);
  }

  for (let j = 0; j < booksArray.length; j++) {
    const book = booksArray[j];

    const books = db.books.create(
      {
        title: book.title,
        author: book.author,
        genre: book.genre,
        description: book.description,
        logo: book.logo,
        rating: book.rating,
        comments: book.comments,
        price: book.price,
        dateOfIssue: book.dateOfIssue,
      },
    );

    // eslint-disable-next-line no-await-in-loop
    await db.books.save(books);
  }
})();
