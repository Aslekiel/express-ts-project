import jwt from 'jsonwebtoken';
import { Cart } from './../../db/entities/Cart';
import type { Handler } from 'express';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';

export const addBooksToCart: Handler = async (req, res, next) => {
  try {
    const { user } = req;

    console.log(user);

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const { bookId } = req.body;

    const book = await db.books.findOneBy({ id: bookId });

    const carts = await db.cart.createQueryBuilder("cart")
    .leftJoinAndSelect("cart.user", "user")
    .getMany()

    console.log(carts);

    if (!user.cart) {
        const newCart = new Cart();
        newCart.books = [book];

        const cart = await db.cart.save(newCart);
        user.cart = cart;

        res.json({ user });
    }

    // const booksInCart = [];

    user.cart.books = [...user.cart.books, book];

    // console.log(user.cart?.books);

    res.json({ user });
  } catch (error) {
    next(error);
  }
};
