import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import passport from 'passport';
import { Op, Sequelize, fn } from 'sequelize';

import User from '../models/user';
import Image from '../models/image';
import Post from '../models/post';
import Comment from '../models/comment';
import UserHistory from '../models/userHistory';
import ReplyComment from '../models/replyComment';
import { isLoggedIn, isNotLoggedIn } from './middleware';

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (err) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      let basename = Buffer.from(path.basename(file.originalname, ext), 'latin1').toString('utf8');
      basename = basename.replace(/[^가-힣a-zA-Z0-9]/g, '');

      done(null, basename + '_' + new Date().getTime() + ext);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }
});

router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const { email, nickname, password } = req.body;

    const exUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { nickname }]
      }
    });

    if (exUser) {
      const errorMessage = exUser.email === email ? '이미 사용중인 이메일입니다.' : '이미 사용중인 닉네임입니다.';
      return res.status(403).json({ message: errorMessage });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      nickname,
      email,
      password: hashedPassword,
      desc: '',
      isRecommended: false
    });

    res.status(200).json({ message: 'Gallery Grid에 오신걸 환영합니다.' });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/login', isNotLoggedIn, async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }

    if (info) {
      return res.status(401).send({ message: info.message });
    }

    return req.logIn(user, async loginErr => {
      if (loginErr) {
        console.error(loginErr);
        next(loginErr);
      }

      const fullUser = await User.findOne({
        where: { id: user.id },
        include: [
          {
            model: User,
            as: 'Followings',
            attributes: ['id']
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id']
          },
          {
            model: Image,
            as: 'ProfileImage',
            where: { type: 'user' },
            attributes: ['id', 'src'],
            required: false
          }
        ],
        attributes: {
          exclude: ['password', 'snsId', 'provider']
        }
      });

      return res.status(200).json(fullUser);
    });
  })(req, res, next);
});

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        where: { id: req.user.id },
        include: [
          { model: Post, attributes: ['id'] },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
            through: { attributes: [] }
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
            through: { attributes: [] }
          },
          {
            model: Image,
            as: 'ProfileImage',
            where: { type: 'user' },
            attributes: ['id', 'src'],
            required: false
          }
        ],
        attributes: {
          exclude: ['password', 'snsId', 'provider']
        }
      });
      res.status(200).json(user);
    } else {
      res.status(401).json({ message: '인증되지 않은 사용자입니다.' });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }),
  (req, res) => {
    if (req.user) {
      req.login(req.user, (err: any) => {
        if (err) {
          return res.redirect('http://localhost:3000');
        }
        res.redirect('http://localhost:3000/auth');
      });
    } else {
      res.redirect('http://localhost:3000');
    }
  }
);

router.post('/logout', isLoggedIn, (req, res, next) => {
  req.logout({}, err => {
    if (err) {
      console.error(err);
      next(err);
    }

    req.session!.destroy(() => {
      res.send('정상적으로 로그아웃 되었습니다.');
    });
  });
});

router.patch('/edit', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const { nickname, desc, isRecommended, image } = req.body;
    const userId = req.user!.id;

    const existingUser = await User.findOne({
      where: { nickname, id: { [Op.ne]: userId } }
    });

    if (existingUser) {
      return res.status(400).json({ message: '이미 사용 중인 닉네임입니다.' });
    }

    await User.update(
      {
        nickname,
        desc,
        isRecommended: isRecommended === 'true'
      },
      { where: { id: userId } }
    );

    const existingImage = await Image.findOne({ where: { UserId: userId, type: 'user' } });

    if (image) {
      if (existingImage) {
        await existingImage.update({ src: image });
      } else {
        await Image.create({
          src: image,
          type: 'user',
          UserId: userId
        });
      }
    } else {
      if (existingImage) {
        await existingImage.update({ UserId: null });
      }
    }

    const user = await User.findOne({
      where: { id: req.user!.id },
      include: [
        { model: Post, attributes: ['id'] },
        {
          model: User,
          as: 'Followings',
          attributes: ['id']
        },
        {
          model: User,
          as: 'Followers',
          attributes: ['id']
        },
        {
          model: Image,
          as: 'ProfileImage',
          where: { type: 'user' },
          attributes: ['id', 'src'],
          required: false
        }
      ],
      attributes: {
        exclude: ['password', 'snsId', 'provider']
      }
    });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/follow/:id', isLoggedIn, async (req, res, next) => {
  try {
    const targetId = parseInt(req.params.id, 10);
    const userId = req.user!.id;

    UserHistory.create({
      type: 'follow',
      PostId: 1,
      AlerterId: userId,
      AlertedId: targetId,
      isRead: false
    });

    const me = await User.findOne({
      where: { id: userId }
    });

    await me!.addFollowing(targetId);

    res.status(200).json(targetId);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/follow/:id', isLoggedIn, async (req, res, next) => {
  try {
    const targetId = parseInt(req.params.id, 10);
    const userId = req.user!.id;

    await UserHistory.destroy({
      where: {
        type: 'follow',
        AlerterId: userId,
        AlertedId: targetId
      }
    });

    const me = await User.findOne({
      where: { id: userId }
    });

    await me!.removeFollowing(targetId);

    res.status(200).json(targetId);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/best', isLoggedIn, async (req, res, next) => {
  try {
    const bestUsers = await User.findAll({
      where: { isRecommended: true },
      attributes: [
        'id',
        'nickname',
        'desc',
        [Sequelize.literal('(SELECT COUNT(*) FROM Follow WHERE Follow.FollowingId = User.id)'), 'followerCount'],
        [
          Sequelize.literal(
            '(SELECT COUNT(*) FROM `Like` INNER JOIN posts ON posts.id = `Like`.PostId WHERE posts.UserId = User.id)'
          ),
          'likeCount'
        ],
        [
          Sequelize.literal(
            '(SELECT COUNT(*) FROM comments WHERE comments.PostId IN (SELECT id FROM posts WHERE posts.UserId = User.id))'
          ),
          'commentCount'
        ],
        [
          Sequelize.literal(
            '(SELECT COUNT(*) FROM reply_comments INNER JOIN comments ON reply_comments.CommentId = comments.id WHERE comments.PostId IN (SELECT id FROM posts WHERE posts.UserId = User.id))'
          ),
          'replyCommentCount'
        ]
      ],
      include: [
        {
          model: Image,
          as: 'ProfileImage',
          where: { type: 'user' },
          attributes: ['id', 'src'],
          required: false
        },
        {
          model: Post,
          attributes: [],
          include: [
            {
              model: User,
              as: 'Likers',
              attributes: [],
              through: { attributes: [] }
            },
            {
              model: Comment,
              attributes: [],
              include: [
                {
                  model: ReplyComment,
                  as: 'Replies',
                  attributes: []
                }
              ]
            }
          ]
        }
      ],
      group: ['User.id'],
      order: [
        [
          Sequelize.literal(
            '((SELECT COUNT(*) FROM Follow WHERE Follow.FollowingId = User.id) * 2 + ' +
              '(SELECT COUNT(*) FROM `Like` INNER JOIN posts ON posts.id = `Like`.PostId WHERE posts.UserId = User.id) * 0.5 + ' +
              '(SELECT COUNT(*) FROM comments WHERE comments.PostId IN (SELECT id FROM posts WHERE posts.UserId = User.id)) * 0.5 + ' +
              '(SELECT COUNT(*) FROM reply_comments INNER JOIN comments ON reply_comments.CommentId = comments.id WHERE comments.PostId IN (SELECT id FROM posts WHERE posts.UserId = User.id)) * 0.5)'
          ),
          'DESC'
        ]
      ],
      limit: 5
    });

    res.status(200).json(bestUsers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/suggest', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const excludeIds = Array.isArray(req.query.excludeIds)
      ? req.query.excludeIds.map(Number)
      : typeof req.query.excludeIds === 'string'
      ? req.query.excludeIds.split(',').map(Number)
      : [];

    const popularUsers = await User.findAll({
      where: {
        id: {
          [Op.not]: [userId, ...excludeIds]
        },
        isRecommended: true
      },
      attributes: [
        'id',
        'nickname',
        'desc',
        [Sequelize.literal('(SELECT COUNT(*) FROM Follow WHERE Follow.FollowingId = User.id)'), 'followerCount'],
        [
          Sequelize.literal(
            '(SELECT COUNT(*) FROM `Like` INNER JOIN posts ON posts.id = `Like`.PostId WHERE posts.UserId = User.id)'
          ),
          'likeCount'
        ],
        [
          Sequelize.literal(
            '(SELECT COUNT(*) FROM comments WHERE comments.PostId IN (SELECT id FROM posts WHERE posts.UserId = User.id))'
          ),
          'commentCount'
        ],
        [
          Sequelize.literal(
            '(SELECT COUNT(*) FROM reply_comments INNER JOIN comments ON reply_comments.CommentId = comments.id WHERE comments.PostId IN (SELECT id FROM posts WHERE posts.UserId = User.id))'
          ),
          'replyCommentCount'
        ]
      ],
      include: [
        {
          model: Image,
          as: 'ProfileImage',
          where: { type: 'user' },
          attributes: ['id', 'src'],
          required: false
        }
      ],
      order: [
        [
          Sequelize.literal('(followerCount * 2 + likeCount * 0.5 + commentCount * 0.5 + replyCommentCount * 0.5)'),
          'DESC'
        ]
      ],
      limit: 100
    });

    const shuffledUsers = popularUsers.sort(() => 0.5 - Math.random()).slice(0, 3);
    res.status(200).json(shuffledUsers);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/info/:id', isLoggedIn, async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: ['id', 'nickname', 'desc'],
      include: [
        {
          model: Image,
          as: 'ProfileImage',
          attributes: ['id', 'src'],
          required: false
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ message: '유저가 존재하지 않습니다.' });
    }

    const posts = await user.getPosts();
    const postsCount = posts.length;

    const followers = await user.getFollowers();
    const followersCount = followers.length;

    const followings = await user.getFollowings();
    const followingsCount = followings.length;

    res.status(200).json({
      id: user.id,
      nickname: user.nickname,
      desc: user.desc,
      ProfileImage: user.ProfileImage,
      postsCount,
      followersCount,
      followingsCount
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
