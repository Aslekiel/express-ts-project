import express from 'express';
import { getAllGenres } from '../controllers/books/getAllGenres';
import { getAllBooks } from '../controllers/books/getAllBooks';
import { getFilteredArrayOfBooks } from '../controllers/books/getFilteredArrayOfBooks';
import { getBookById } from '../controllers/books/getBookById';

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/genres', getAllGenres);
booksRouter.post('/filter', getFilteredArrayOfBooks);
booksRouter.post('/book', getBookById);

export default booksRouter;
