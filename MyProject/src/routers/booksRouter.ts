import express from 'express';
import { getAllGenres } from '../controllers/books/getAllGenres';
import { getAllBooks } from '../controllers/books/getAllBooks';
import { getFilteredArrayOfBooks } from '../controllers/books/getFilteredArrayOfBooks';

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);
booksRouter.get('/genres', getAllGenres);
booksRouter.post('/filter', getFilteredArrayOfBooks);

export default booksRouter;
