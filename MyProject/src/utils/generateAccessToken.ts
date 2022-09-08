import jwt from 'jsonwebtoken';

export const generateAccessToken = (id: number) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_TIME,
  });
};
