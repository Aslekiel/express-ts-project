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

    const findBook = await db.books.findOneBy({ id: bookId });

    const newComment = new Comment();
    newComment.books = findBook;
    newComment.user = user;
    newComment.comment = userComment;

    const comment = await db.comment.save(newComment);

    res.json({
      id,
      fullname: comment.user.fullname,
      avatar: comment.user.avatar,
      comment: comment.comment,
    });
  } catch (error) {
    next(error);
  }
};
