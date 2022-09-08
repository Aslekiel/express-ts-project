import { AppDataSource } from './db/DataSource';
import app from './app';
import config from './config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import types from './types';

(async () => {
  // eslint-disable-next-line no-console
  await AppDataSource.initialize().catch((error) => console.log(error));

  app.listen(config.port, () => {
    // eslint-disable-next-line no-console
    console.log('Server start');
  });
})();
