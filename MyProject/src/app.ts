import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { errorHandler } from './errorHandler/errorHandler';
import mainRouter from './routers';

dotenv.config();

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(express.static(path.resolve(__dirname, '..', 'static')));
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.body);
  next();
});

app.use('/api', mainRouter);

app.use(errorHandler);

export default app;
