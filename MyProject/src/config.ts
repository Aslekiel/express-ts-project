import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.DB_HOST,
  port: process.env.PORT,
  db: {
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TITLE,
  },
  passwordSalt: process.env.SALT,
  token: {
    expiration: process.env.TOKEN_TIME,
    secret: process.env.TOKEN_SECRET,
  },
  errors: {
    registration_err: 'This email is already registered!',
    auth_err: 'Pass authorization!',
    token_err: 'Token error!',
    server_err: 'Server error!',
    email_err: 'User with this email was not found!',
    password_err: 'Wrong password entered!',
    none_user_err: 'No such user found!',
    validation_err: 'Validation error!',
    old_password_err: 'Wrong old password entered!',
  },
};

export default config;
