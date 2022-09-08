import express from 'express';
import dotenv from 'dotenv';
import { errorHandler } from './errorHandler/errorHandler';
import mainRouter from './routers';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', mainRouter);

app.use(errorHandler);

export default app;