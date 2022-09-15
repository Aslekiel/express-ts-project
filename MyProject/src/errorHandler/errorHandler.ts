import type { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config';
import { CustomError } from '../utils/CustomError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);
  if (err instanceof CustomError) {
    return res
      .status(err.localData.status)
      .json({ message: err.localData.payload || err.localData.message });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: config.errors.server_err });
};
