import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

import Post from '../models/post';
import User from '../models/user';
import Image from '../models/image';
import Comment from '../models/comment';
import { isLoggedIn } from './middleware';
import ReplyComment from '../models/replyComment';

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

router.post('/', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      location: req.body.location,
      UserId: req.user!.id
    });

    if (Array.isArray(req.body.image)) {
      const images = await Promise.all(
        req.body.image.map((image: string) => Image.create({ type: 'post', src: image, PostId: post.id }))
      );
      await post.addImages(images);
    } else {
      const image = await Image.create({ type: 'post', src: req.body.image, PostId: post.id });
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

    res.status(200).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.patch('/:postId', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const { postId } = req.params;
    const { content, location, image: images } = req.body;

    const post = await Post.findOne({ where: { id: postId, UserId: req.user!.id } });
    if (!post) {
      return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
    }

    await Post.update(
      {
        content,
        location: location || null
      },
      {
        where: { id: postId }
      }
    );

    const currentImages = await Image.findAll({ where: { PostId: postId } });
    const currentImageSrcs = currentImages.map(img => img.src);
    const incomingImageSrcs = images ? (Array.isArray(images) ? images : [images]) : [];

    const imagesToAdd = incomingImageSrcs.filter(src => !currentImageSrcs.includes(src));
    const imagesToRemove = currentImageSrcs.filter(src => !incomingImageSrcs.includes(src));

    if (imagesToRemove.length > 0) {
      await Promise.all(
        imagesToRemove.map(async (src: string) => {
          const image = await Image.findOne({ where: { src, PostId: postId } });

          if (image) {
            await image.update({ PostId: null });
          }
        })
      );
    }

    if (imagesToAdd.length > 0) {
      await Promise.all(
        imagesToAdd.map((src: string) => Image.create({ type: 'post', src, PostId: parseInt(postId, 10) }))
      );
    }

    const fullPost = await Post.findOne({
      where: { id: postId },
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

router.delete('/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const userId = req.user!.id;

    const post = await Post.findOne({
      where: { id: postId, UserId: userId }
    });

    if (!post) {
      return res.status(404).json({ message: '게시글이 존재하지 않습니다.' });
    }

    await Post.destroy({
      where: {
        id: req.params.postId,
        UserId: req.user!.id
      }
    });

    res.status(200).json(parseInt(req.params.postId, 10));
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/comment/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.findAll({
      where: { PostId: postId },
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
          model: Post,
          attributes: ['UserId']
        },
        {
          model: Image,
          as: 'CommentImage',
          where: { type: 'comment' },
          attributes: ['id', 'src'],
          required: false
        },
        {
          model: ReplyComment,
          as: 'Replies',
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
              as: 'ReplyImage',
              where: { type: 'reply' },
              attributes: ['id', 'src'],
              required: false
            }
          ],
          order: [['createdAt', 'ASC']]
        }
      ],
      order: [['createdAt', 'ASC']]
    });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/comment', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const { content, PostId, image, parentId } = req.body;

    const post = await Post.findOne({ where: { id: PostId } });
    if (!post) {
      return res.status(404).json({ message: '존재하지 않는 게시글입니다.' });
    }

    if (parentId) {
      const parentComment = await Comment.findOne({ where: { id: parentId } });
      if (!parentComment) {
        return res.status(404).json({ message: '존재하지 않는 댓글입니다.' });
      }

      const newReplyComment = await ReplyComment.create({
        content,
        PostId,
        CommentId: parentId,
        UserId: req.user!.id
      });

      if (image) {
        await Image.create({
          type: 'reply',
          src: image,
          ReplyCommentId: newReplyComment.id
        });
      }

      const fullReplyComment = await ReplyComment.findOne({
        where: { id: newReplyComment.id },
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
            model: Comment,
            attributes: ['id']
          },
          {
            model: Image,
            as: 'ReplyImage',
            where: { type: 'reply' },
            attributes: ['id', 'src'],
            required: false
          }
        ]
      });

      return res.status(201).json({ comment: fullReplyComment, parentId });
    } else {
      const newComment = await Comment.create({
        content,
        PostId,
        UserId: req.user!.id
      });

      if (image) {
        await Image.create({
          type: 'comment',
          src: image,
          CommentId: newComment.id
        });
      }

      const fullComment = await Comment.findOne({
        where: { id: newComment.id },
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
            model: Post,
            attributes: ['UserId']
          },
          {
            model: Image,
            as: 'CommentImage',
            where: { type: 'comment' },
            attributes: ['id', 'src'],
            required: false
          },
          {
            model: ReplyComment,
            as: 'Replies',
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
                as: 'ReplyImage',
                where: { type: 'reply' },
                attributes: ['id', 'src'],
                required: false
              }
            ],
            order: [['createdAt', 'ASC']]
          }
        ]
      });

      return res.status(201).json({ comment: fullComment, parentId });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

export default router;
