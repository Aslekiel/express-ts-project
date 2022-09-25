import express from 'express';
import { addBooksToCart } from '../controllers/cart/addBooksToCart';

const cartRouter = express.Router();

cartRouter.post('/add', addBooksToCart);

export default cartRouter;