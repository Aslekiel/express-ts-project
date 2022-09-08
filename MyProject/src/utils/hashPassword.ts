import crypto from 'crypto';

export const getHashedPassword = (password: string) => {
  return crypto.createHmac('sha256', process.env.SALT).update(password).digest('base64');
};
