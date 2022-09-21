import express from 'express';
import { getAllBooks } from '../controllers/books/getAllBooks';

const booksRouter = express.Router();

booksRouter.get('/', getAllBooks);

export default booksRouter;
