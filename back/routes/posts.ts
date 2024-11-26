import express from 'express';
import { Op, Sequelize } from 'sequelize';

import Post from '../models/post';
import User from '../models/user';
import Image from '../models/image';
import Comment from '../models/comment';
import ReplyComment from '../models/replyComment';
import UserHistory from '../models/userHistory';
import { sequelize } from '../models';
import { isLoggedIn } from './middleware';

const router = express.Router();

router.get('/new', isLoggedIn, async (req, res, next) => {
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

router.get('/best', async (req, res, next) => {
  try {
    const lastId = req.query.lastId ? parseInt(req.query.lastId as string, 10) : 0;
    const lastLikeCount = req.query.lastLikeCount ? parseInt(req.query.lastLikeCount as string, 10) : 0;
    const lastCommentCount = req.query.lastCommentCount ? parseInt(req.query.lastCommentCount as string, 10) : 0;

    const whereClauses: string[] = [];

    if (lastId) {
      whereClauses.push(`Post.id < ${lastId}`);
    }

    if (lastLikeCount || lastCommentCount) {
      const likeCondition = `(SELECT COUNT(*) FROM \`like\` WHERE \`like\`.PostId = Post.id) <= ${lastLikeCount}`;
      const commentCondition =
        `(SELECT COUNT(*) FROM Comments WHERE Comments.PostId = Post.id) + ` +
        `(SELECT COUNT(*) FROM reply_comments AS ReplyComments INNER JOIN Comments ON ReplyComments.CommentId = Comments.id WHERE Comments.PostId = Post.id) <= ${lastCommentCount}`;

      whereClauses.push(`${likeCondition} AND ${commentCondition}`);
    }

    const whereClause = whereClauses.length > 0 ? sequelize.literal(whereClauses.join(' AND ')) : {};

    const posts = await Post.findAll({
      limit: 10,
      order: [
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM `like` WHERE `like`.PostId = Post.id) + ' +
              '(SELECT COUNT(*) FROM Comments WHERE Comments.PostId = Post.id) + ' +
              '(SELECT COUNT(*) FROM reply_comments AS ReplyComments ' +
              'INNER JOIN Comments ON ReplyComments.CommentId = Comments.id WHERE Comments.PostId = Post.id)'
          ),
          'DESC'
        ],
        ['createdAt', 'DESC']
      ],
      where: whereClause,
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

router.get('/following', isLoggedIn, async (req, res, next) => {
  try {
    const { lastCreatedAt, limit } = req.query;
    const postsLimit = parseInt(limit as string, 10) || 10;

    const user = await User.findOne({
      where: { id: req.user!.id }
    });

    if (!user) {
      return res.status(404).send('유저 정보가 존재하지 않습니다.');
    }

    const followings = await user.getFollowings({
      attributes: ['id']
    });

    const followingIds = followings.map(following => following.id);

    if (followingIds.length === 0) {
      return res.status(200).json([]);
    }

    const posts = await Post.findAll({
      where: {
        UserId: { [Op.in]: followingIds },
        ...(lastCreatedAt && { createdAt: { [Op.lt]: new Date(lastCreatedAt as string) } })
      },
      limit: postsLimit,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
          include: [
            {
              model: Image,
              as: 'ProfileImage',
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

    return res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/user', isLoggedIn, async (req, res, next) => {
  try {
    const where: { id?: { [Op.lt]: number } } = {};
    const userId = String(req.query.userId);
    const lastId = parseInt(req.query.lastId as string, 10) || 0;

    if (lastId) {
      where.id = { [Op.lt]: lastId };
    }

    const user = await User.findByPk(userId, {
      attributes: ['id', 'nickname']
    });

    if (!user) {
      return res.status(404).json({ message: '유저가 존재하지 않습니다.' });
    }

    const posts = await user.getPosts({
      where,
      limit: 14,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
          include: [
            {
              model: Image,
              as: 'ProfileImage',
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
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/interactions', async (req, res, next) => {
  try {
    const menu = req.query.menu as 'all' | 'like' | 'comment';
    const sortBy = req.query.sortBy as 'best' | 'new';
    const userId = req.user!.id;

    let order: any = [['Post', 'createdAt', 'DESC']];
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

    let where: any = { AlerterId: userId, type: { [Op.ne]: 'follow' } };
    if (menu === 'like') {
      where = { ...where, type: 'like' };
    } else if (menu === 'comment') {
      where = { ...where, type: { [Op.or]: ['comment', 'replyComment'] } };
    }

    const posts = await UserHistory.findAll({
      where,
      attributes: ['id', 'type'],
      order,
      include: [
        {
          model: Post,
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
      ],
      group: ['Post.id', 'Post->Comments.id', 'Post->Comments->Replies.id', 'Post->Images.id', 'Post->Likers.id']
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/interactions', isLoggedIn, async (req, res, next) => {
  try {
    const { menu, id } = req.body;
    const userId = req.user!.id;

    const userHistoryItems = await UserHistory.findAll({
      where: { id }
    });

    if (userHistoryItems.length === 0) {
      return res.status(404).json({ message: '해당 게시글에 대한 기록이 없습니다.' });
    }

    for (const userHistory of userHistoryItems) {
      const { type, PostId, CommentId, ReplyCommentId } = userHistory;

      if (menu === 'all') {
        const likes = await UserHistory.findAll({ where: { PostId, type: 'like' } });
        for (const likeHistory of likes) {
          const post = await Post.findOne({ where: { id: PostId! } });
          if (post) await post.removeLiker(userId);
          await likeHistory.destroy();
        }

        const comments = await UserHistory.findAll({ where: { PostId, type: 'comment' } });
        for (const commentHistory of comments) {
          if (commentHistory.CommentId) {
            const replyCommentsCount = await ReplyComment.count({ where: { CommentId: commentHistory.CommentId } });

            if (replyCommentsCount > 0) {
              await Comment.update({ isDeleted: true }, { where: { id: commentHistory.CommentId, UserId: userId } });
            } else {
              await Image.update({ CommentId: null }, { where: { CommentId: commentHistory.CommentId } });
              await Comment.destroy({ where: { id: commentHistory.CommentId, UserId: userId } });
            }

            await commentHistory.destroy();
          }
        }

        const replyComments = await UserHistory.findAll({ where: { PostId, type: 'replyComment' } });
        for (const replyHistory of replyComments) {
          if (replyHistory.ReplyCommentId) {
            await Image.update({ ReplyCommentId: null }, { where: { ReplyCommentId: replyHistory.ReplyCommentId } });
            await UserHistory.destroy({ where: { ReplyCommentId: replyHistory.ReplyCommentId } });
            await ReplyComment.destroy({ where: { id: replyHistory.ReplyCommentId, UserId: userId } });
          }
        }
      } else if (menu === 'like') {
        const post = await Post.findOne({ where: { id: PostId! } });
        if (!post) {
          return res.status(403).json({ message: '게시글이 존재하지 않습니다.' });
        }

        await post.removeLiker(userId);
        await userHistory.destroy();
      } else if (menu === 'comment') {
        if (type === 'comment' && CommentId) {
          const replyCommentsCount = await ReplyComment.count({ where: { CommentId } });

          if (replyCommentsCount > 0) {
            await Comment.update({ isDeleted: true }, { where: { id: CommentId, UserId: userId } });
          } else {
            await Image.update({ CommentId: null }, { where: { CommentId: CommentId } });
            await Comment.destroy({ where: { id: CommentId, UserId: userId } });
          }
        }

        if (type === 'replyComment' && ReplyCommentId) {
          await Image.update({ ReplyCommentId: null }, { where: { ReplyCommentId: ReplyCommentId } });
          await UserHistory.destroy({ where: { ReplyCommentId } });
          await ReplyComment.destroy({ where: { id: ReplyCommentId, UserId: userId } });
        }

        await userHistory.destroy();
      }
    }

    res.status(200).json(id);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/activities', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const lastId = req.query.lastId ? parseInt(req.query.lastId as string, 10) : 0;
    const where: any = { isRead: false, AlertedId: userId, AlerterId: { [Op.ne]: userId } };

    if (lastId) {
      where.id = { [Op.lt]: lastId };
    }

    const posts = await UserHistory.findAll({
      where,
      attributes: ['id', 'type', 'createdAt'],
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [
        {
          model: Post,
          required: false,
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
        },
        {
          model: User,
          attributes: ['id', 'nickname'],
          as: 'Alerter',
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
          model: Comment,
          attributes: ['id', 'content']
        },
        {
          model: ReplyComment,
          attributes: ['id', 'content']
        }
      ]
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const keyword = req.query.keyword as string;
    const lastId = req.query.lastId ? parseInt(req.query.lastId as string, 10) : 0;
    const lastLikeCount = req.query.lastLikeCount ? parseInt(req.query.lastLikeCount as string, 10) : 0;
    const lastCommentCount = req.query.lastCommentCount ? parseInt(req.query.lastCommentCount as string, 10) : 0;

    const whereClauses: string[] = [];

    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({ message: '검색어가 유효하지 않습니다.' });
    }

    whereClauses.push(`Post.content LIKE '%${keyword}%'`);

    if (lastId) {
      whereClauses.push(`Post.id < ${lastId}`);
    }

    if (lastLikeCount || lastCommentCount) {
      const likeCondition = `(SELECT COUNT(*) FROM \`like\` WHERE \`like\`.PostId = Post.id) <= ${lastLikeCount}`;
      const commentCondition =
        `(SELECT COUNT(*) FROM Comments WHERE Comments.PostId = Post.id) + ` +
        `(SELECT COUNT(*) FROM reply_comments AS ReplyComments INNER JOIN Comments ON ReplyComments.CommentId = Comments.id WHERE Comments.PostId = Post.id) <= ${lastCommentCount}`;

      whereClauses.push(`${likeCondition} AND ${commentCondition}`);
    }

    const whereClause = whereClauses.length > 0 ? sequelize.literal(whereClauses.join(' AND ')) : {};

    const posts = await Post.findAll({
      limit: 12,
      order: [
        [
          sequelize.literal(
            '(SELECT COUNT(*) FROM `like` WHERE `like`.PostId = Post.id) + ' +
              '(SELECT COUNT(*) FROM Comments WHERE Comments.PostId = Post.id) + ' +
              '(SELECT COUNT(*) FROM reply_comments AS ReplyComments ' +
              'INNER JOIN Comments ON ReplyComments.CommentId = Comments.id WHERE Comments.PostId = Post.id)'
          ),
          'DESC'
        ],
        ['createdAt', 'DESC']
      ],
      where: whereClause,
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
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
