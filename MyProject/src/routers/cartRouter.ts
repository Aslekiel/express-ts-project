import express from 'express';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { addBooksToCart } from '../controllers/cart/addBooksToCart';

const cartRouter = express.Router();

cartRouter.use(authenticateJWT);

cartRouter.post('/add', addBooksToCart);

export default cartRouter;
