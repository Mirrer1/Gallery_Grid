import express from 'express';
import { Op, Sequelize } from 'sequelize';

import Post from '../models/post';
import User from '../models/user';
import Image from '../models/image';
import Comment from '../models/comment';
import ReplyComment from '../models/replyComment';

const router = express.Router();

router.get('/new', async (req, res, next) => {
  try {
    const where: { id?: { [Op.lt]: number } } = {};
    const lastId = req.query.lastId ? parseInt(req.query.lastId as string, 10) : 0;

    if (lastId) {
      where.id = { [Op.lt]: lastId };
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
          attributes: ['id'],
          through: { attributes: [] }
        },
        {
          model: Comment,
          attributes: ['id', 'isDeleted'],
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

router.get('/interactions', async (req, res, next) => {
  try {
    const where: { id?: { [Op.lt]: number } } = {};
    const lastId = req.query.lastId ? parseInt(req.query.lastId as string, 10) : 0;
    const sortBy = req.query.sortBy as 'best' | 'new';
    const userId = req.user!.id;

    if (lastId) {
      where.id = { [Op.lt]: lastId };
    }

    // res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
