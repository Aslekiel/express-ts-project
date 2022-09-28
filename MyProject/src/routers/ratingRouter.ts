import express from 'express';
import { addRating } from '../controllers/rating/addRating';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const ratingRouter = express.Router();

ratingRouter.use(authenticateJWT);

ratingRouter.post('/add', addRating);

export default ratingRouter;
