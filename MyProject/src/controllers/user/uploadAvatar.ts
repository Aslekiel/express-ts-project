import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as fs from 'node:fs/promises';
import config from '../../config';
import db from '../../db';
import { getError } from '../../utils/getCustomError';

export const uploadAvatar: Handler = async (req, res, next) => {
  try {
    const id = req.user.id;

    const findUser = await db.userRepository.findOneBy({ id: +id });

    if (!findUser) {
      throw getError(StatusCodes.BAD_REQUEST, config.errors.none_user_err);
    }

    if (findUser.avatar) {
      const oldAvatarName = findUser.avatar.split('http://localhost:5000/')[1];
      fs.unlink(`static/${oldAvatarName}`);
    }

    const avatar = req.body.avatar;

    const avatarExtension = avatar.substring('data:image/'.length, avatar.indexOf(';base64'));

    const avatarName = `${Date.now()}.${avatarExtension}`;

    const path = `static/${avatarName}`;

    const base64Data = avatar.replace(/^data:([A-Za-z-+/]+);base64,/, '');

    fs.writeFile(path, base64Data, { encoding: 'base64' });

    const avatarPath = `http://localhost:5000/${avatarName}`;

    findUser.avatar = avatarPath;

    const user = await db.userRepository.save(findUser);

    res.json({ user });
  } catch (error) {
    next(error);
  }
};
