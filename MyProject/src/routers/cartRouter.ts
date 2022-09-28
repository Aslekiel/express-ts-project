import express from 'express';
import { getBooksFromCart } from '../controllers/cart/getBooksFromCart';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { addBooksToCart } from '../controllers/cart/addBooksToCart';
import { deleteFromCart } from '../controllers/cart/deleteFromCart';
import { addBookCopy } from '../controllers/cart/addBookCopy';
import { removeBookCopy } from '../controllers/cart/removeBookCopy';

const cartRouter = express.Router();

cartRouter.use(authenticateJWT);

cartRouter.post('/add', addBooksToCart);
cartRouter.get('/', getBooksFromCart);
cartRouter.post('/delete', deleteFromCart);
cartRouter.post('/add-copy', addBookCopy);
cartRouter.post('/remove-copy', removeBookCopy);

export default cartRouter;
