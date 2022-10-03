import express from 'express';
import { getAllGenres } from '../controllers/books/getAllGenres';
import { getAllBooks } from '../controllers/books/getAllBooks';
import { getBookById } from '../controllers/books/getBookById';
import { getRecomendedBooks } from '../controllers/books/getRecomendedBooks';

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/genres', getAllGenres);
booksRouter.post('/book', getBookById);
booksRouter.post('/recommend', getRecomendedBooks);

export default booksRouter;
