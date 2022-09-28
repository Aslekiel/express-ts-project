import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import config from '../../config';
import { Cart } from '../../db/entities/Cart';

export const removeBookCopy: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository.findOne({ relations: { cart: true }, where: { id: +id } });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const { bookId } = req.body;

    const booksIdsFromCart = user.cart.map((cart) => cart.bookId);

    if (booksIdsFromCart.includes(bookId)) {
      await db.cart
        .createQueryBuilder()
        .update(Cart)
        .set({
          count: () => 'count - 1',
        })
        .where('userId = :id', { id: user.id })
        .andWhere('bookId = :bookId', { bookId })
        .execute();

      const userCarts = await db.cart.find({ where: { userId: user.id } });

      return res.json({ cart: userCarts });
    }
  } catch (error) {
    next(error);
  }
};
