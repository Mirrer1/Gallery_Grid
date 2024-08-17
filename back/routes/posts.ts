import express from 'express';
import { Op } from 'sequelize';

import Post from '../models/post';
import User from '../models/user';
import Image from '../models/image';
import Comment from '../models/comment';
import ReplyComment from '../models/replyComment';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const where: { id?: { [Op.lt]: number } } = {};
    const lastId = req.query.lastId as string | undefined;

    if (lastId && parseInt(lastId, 10)) {
      where.id = { [Op.lt]: parseInt(lastId, 10) };
    }

    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC']
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
          include: [
            {
              model: Image,
              as: 'ProfileImage',
              where: { type: 'user' },
              attributes: ['id', 'src'],
              required: false
            }
          ]
        },
        {
          model: Image,
          where: { type: 'post' },
          attributes: ['id', 'src']
        },
        {
          model: User,
          as: 'Likers',
          attributes: ['id']
        },
        {
          model: Comment,
          attributes: ['id'],
          include: [
            {
              model: ReplyComment,
              as: 'Replies',
              attributes: ['id']
            }
          ]
        }
      ]
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
