import express from 'express';
import { getBooksFromCart } from '../controllers/cart/getBooksFromCart';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { addBooksToCart } from '../controllers/cart/addBooksToCart';
import { deleteFromCart } from '../controllers/cart/deleteFromCart';
import { reduceBookAmount } from '../controllers/cart/reduceBookAmount';
import { increaseBookAmount } from '../controllers/cart/increaseBookAmount';

const cartRouter = express.Router();

cartRouter.use(authenticateJWT);

cartRouter.post('/', addBooksToCart);
cartRouter.get('/', getBooksFromCart);
cartRouter.delete('/', deleteFromCart);
cartRouter.patch('/', increaseBookAmount);
cartRouter.patch('/reduce', reduceBookAmount);

export default cartRouter;
