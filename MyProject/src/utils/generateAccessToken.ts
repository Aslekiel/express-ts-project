import jwt from "jsonwebtoken";

export const generateAccessToken = (id: number, time: string) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: time,
  });
};
