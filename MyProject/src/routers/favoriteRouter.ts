import express from 'express';
import { authenticateJWT } from '../middlewares/authenticateJWT';
import { addFavoriteBook } from '../controllers/favorites/addFavoriteBook';
import { deleteFavoriteBook } from '../controllers/favorites/deleteFavoriteBook';
import { getFavoriteBooks } from '../controllers/favorites/getFavoriteBooks';

const favoriteRouter = express.Router();
favoriteRouter.use(authenticateJWT);

favoriteRouter.post('/', addFavoriteBook);
favoriteRouter.delete('/', deleteFavoriteBook);
favoriteRouter.get('/', getFavoriteBooks);

export default favoriteRouter;
