import express from 'express';
import bcrypt from 'bcrypt';
import { Op } from 'sequelize';

import User from '../models/user';

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
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
