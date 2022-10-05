import type { Handler } from 'express';
import db from '../../db';

export const findCommentatorsById: Handler = async (req, res, next) => {
  try {
    const { commentatorsIds } = req.body;

    const commentatorsWithFullInfo = await db.userRepository.createQueryBuilder('user')
      .where('user.id IN (:...commentatorsIds)', { commentatorsIds })
      .getMany();

    const commentators = commentatorsWithFullInfo.map((commentator) => {
      return {
        id: commentator.id, fullname: commentator.fullname, avatar: commentator.avatar,
      };
    });

    res.json(commentators);
  } catch (error) {
    next(error);
  }
};
