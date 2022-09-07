import { CustomError } from "./CustomError";

export const getError = (status: number, message: string) => {
  return new CustomError(status, message);
};
