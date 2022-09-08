import { CustomError } from './CustomError';

export const getError = (status: number, message: string, payload?: object) => {
  return new CustomError(status, message, payload);
};
