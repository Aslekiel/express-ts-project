import express from 'express';
import { addComment } from '../controllers/comments/addComment';
import { authenticateJWT } from '../middlewares/authenticateJWT';

const commentRouter = express.Router();

commentRouter.use(authenticateJWT);

commentRouter.post('/add', addComment);

export default commentRouter;
