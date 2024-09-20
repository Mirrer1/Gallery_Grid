import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

import User from '../models/user';
import passport from 'passport';
import Image from '../models/image';
import Post from '../models/post';
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

export default router;
