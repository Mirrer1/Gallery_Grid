import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import Post from '../models/post';
import User from '../models/user';
import Image from '../models/image';
import Comment from '../models/comment';
import { isLoggedIn } from './middleware';

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
      const basename = Buffer.from(path.basename(file.originalname, ext), 'latin1').toString('utf8');
      done(null, basename + '_' + new Date().getTime() + ext);
    }
  }),
  limits: { fileSize: 20 * 1024 * 1024 }
});

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      location: req.body.location,
      UserId: req.user!.id
    });

    if (Array.isArray(req.body.image)) {
      const images = await Promise.all(
        req.body.image.map((image: string) => Image.create({ type: 'post', src: image }))
      );
      await post.addImages(images);
    } else {
      const image = await Image.create({ type: 'post', src: req.body.image });
      await post.addImages([image]);
    }

    const fullPost = await Post.findOne({
      where: { id: post.id },
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
          include: [
            {
              model: User,
              attributes: ['id', 'nickname']
            }
          ]
        }
      ]
    });

    res.status(200).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/images', isLoggedIn, upload.array('image'), async (req, res, next) => {
  try {
    const files = req.files as Express.Multer.File[];

    res.status(200).json(files.map(v => v.filename));
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
