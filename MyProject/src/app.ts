import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandler } from './errorHandler/errorHandler';
import mainRouter from './routers';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.body);
  next();
});

app.use('/api', mainRouter);

app.use(errorHandler);

export default app;
