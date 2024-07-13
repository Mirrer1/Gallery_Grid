import express from 'express';

import Post from '../models/post';
import { isLoggedIn } from './middleware';
import User from '../models/user';

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const newPost = await Post.create({
      content: req.body.content,
      location: req.body.location,
      UserId: req.user!.id
    });

    const fullPost = await Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname']
        }
      ]
    });

    res.status(200).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
