import { AppDataSource } from './src/db/DataSource';
import db from './src/db';

const genres = [
  'Fiction', 'Non—fiction', 'Light fiction',
  'Science-fiction', 'Fantasy', 'Business & Finance',
  'Politics', 'Travel books', 'Autobiography', 'History',
  'Thriller / Mystery', 'Romance', 'Satire', 'Horror',
  'Health / Medicine', 'Children’s books', 'Encyclopedia',
];

const books = [

];

(async () => {
  await AppDataSource.initialize();

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    // await db.genge.create();
  }
})();
