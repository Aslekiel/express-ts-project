import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError } from "../utils/utils";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    console.log({ path: req.url, message: err.localData.message });
    console.log(res);
    return res
      .status(err.localData.status)
      .json({ message: err.localData.message });
  } else {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Server error!");
  }
};
