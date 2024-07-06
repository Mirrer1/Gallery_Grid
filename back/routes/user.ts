import express from 'express';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

import User from '../models/user';
import passport from 'passport';
import Image from '../models/image';

const router = express.Router();

router.post('/', async (req, res, next) => {
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

router.post('/login', async (req, res, next) => {
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
            model: Image,
            as: 'ProfileImage',
            where: { type: 'user' },
            attributes: ['id', 'src'],
            required: false
          }
        ],
        attributes: {
          exclude: ['password', 'isRecommended']
        }
      });

      return res.status(200).json(fullUser);
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
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

export default router;
