import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generateAccessToken = (id: string, time: string) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: time,
  });
};

export const getError = (status: number, message: string) => {
  return new CustomError(status, message);
};

export const getHashedPassword = (password: string) => {
  const sha256 = crypto.createHmac("sha256", process.env.SALT);
  const hash = sha256.update(password).digest("base64");
  return hash;
};

export class CustomError extends Error {
  localData: { status: number; message: string };

  constructor(status: number, message: string) {
    super(message);
    this.localData = { status, message };

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
