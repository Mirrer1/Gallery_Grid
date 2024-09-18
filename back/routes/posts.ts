import express from 'express';
import { Op, Sequelize } from 'sequelize';

import Post from '../models/post';
import User from '../models/user';
import Image from '../models/image';
import Comment from '../models/comment';
import ReplyComment from '../models/replyComment';
import { sequelize } from '../models';
import UserHistory from '../models/userHistory';

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
    const lastId = req.query.lastId ? parseInt(req.query.lastId as string, 10) : 0;
    const sortBy = req.query.sortBy as 'best' | 'new';
    const userId = req.user!.id;

    let order: [string | any, string][] = [['createdAt', 'DESC']];
    if (sortBy === 'best') {
      order = [
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM `like` WHERE `like`.PostId = Post.id) + ' +
              '(SELECT COUNT(*) FROM Comments WHERE Comments.PostId = Post.id) + ' +
              '(SELECT COUNT(*) FROM reply_comments AS ReplyComments INNER JOIN Comments ON ReplyComments.CommentId = Comments.id WHERE Comments.PostId = Post.id)'
          ),
          'DESC'
        ]
      ];
    }

    const posts = await UserHistory.findAll({
      where: { AlerterId: userId },
      attributes: ['id', 'type'],
      order,
      include: [
        {
          model: Post,
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
                { model: User, attributes: ['id'] },
                {
                  model: ReplyComment,
                  as: 'Replies',
                  attributes: ['id'],
                  include: [{ model: User, attributes: ['id'] }]
                }
              ]
            }
          ]
        }
        // {
        //   model: User,
        //   as: 'Alerter'
        // }
      ],
      group: ['Post.id', 'Post->Comments.id', 'Post->Comments->Replies.id', 'Post->Images.id', 'Post->Likers.id']
    });

    // const divideAlert = posts.slice(0, parseInt(req.query.alertLimit, 10));
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
