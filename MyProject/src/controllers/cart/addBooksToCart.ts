import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { User } from 'db/entities/User';
import { Cart } from '../../db/entities/Cart';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import config from '../../config';

export const addBooksToCart: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository.findOneBy({ id: +id });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const { bookId } = req.body;

    const book = await db.books.findOneBy({ id: bookId });

    const findCart = await db.cart
      .createQueryBuilder('cart')
      .innerJoinAndSelect('cart.books', 'books')
      .innerJoin('cart.user', 'user')
      .where({ id: user.id })
      .getOne();

    if (!findCart) {
      const cart = new Cart();

      cart.books.push(book);

      cart.user = user;

      await db.cart.save(cart);

      res.json({ user });
    }

    findCart.books = [...findCart.books, book];

    await db.cart.save(findCart);

    res.json({ user });
  } catch (error) {
    next(error);
  }
};
