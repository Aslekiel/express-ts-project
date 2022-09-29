import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Comment } from '../../db/entities/Comment';
import db from '../../db';
import { getError } from '../../utils/getCustomError';
import config from '../../config';

export const addComment: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const user = await db.userRepository
      .findOne({
        where: { id: +id },
      });

    if (!user) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    const { bookId, userComment } = req.body;

    const book = await db.books.findOneBy({ id: bookId });

    const comment = new Comment();
    comment.books = book;
    comment.user = user;
    comment.comment = userComment;

    await db.comment.save(comment);

    const bookComments = await db.comment.find({ where: { userId: user.id } });

    res.json({ comments: bookComments });
  } catch (error) {
    next(error);
  }
};
