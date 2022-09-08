import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../utils/CustomError";
import * as yup from "yup";
import { getErrorsArray } from "../utils/createErrorsArray";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res
      .status(err.localData.status)
      .json({ message: err.localData.message });
  }

  if (err instanceof yup.ValidationError) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: getErrorsArray(err) });
  }

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ message: process.env.SERVER_ERR });
};