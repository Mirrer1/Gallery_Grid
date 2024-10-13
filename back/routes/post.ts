import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Op } from 'sequelize';

import Post from '../models/post';
import User from '../models/user';
import Image from '../models/image';
import Comment from '../models/comment';
import ReplyComment from '../models/replyComment';
import UserHistory from '../models/userHistory';
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

    await UserHistory.destroy({
      where: {
        PostId: req.params.postId
      }
    });

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
              model: Post,
              attributes: ['UserId']
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
            model: Post,
            attributes: ['UserId']
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

      UserHistory.create({
        type: 'replyComment',
        PostId,
        ReplyCommentId: fullReplyComment?.id,
        AlerterId: req.user!.id,
        AlertedId: post.UserId,
        isRead: false
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

      UserHistory.create({
        type: 'comment',
        PostId,
        CommentId: fullComment?.id,
        AlerterId: req.user!.id,
        AlertedId: post.UserId,
        isRead: false
      });

      return res.status(201).json({ comment: fullComment, parentId });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/comment/edit', isLoggedIn, upload.none(), async (req, res, next) => {
  try {
    const { content, commentId, image, parentId } = req.body;

    let comment;
    if (parentId) {
      comment = await ReplyComment.findOne({ where: { id: commentId, CommentId: parentId } });
      if (!comment) {
        return res.status(404).json({ message: '존재하지 않는 댓글입니다.' });
      }

      await comment.update({ content });

      if (image) {
        const replyImage = await Image.findOne({ where: { ReplyCommentId: commentId } });
        if (replyImage) {
          await replyImage.update({ src: image });
        } else {
          await Image.create({
            type: 'reply',
            src: image,
            ReplyCommentId: comment.id
          });
        }
      } else {
        await Image.destroy({ where: { ReplyCommentId: commentId } });
      }
    } else {
      comment = await Comment.findOne({ where: { id: commentId } });
      if (!comment) {
        return res.status(404).json({ message: '존재하지 않는 댓글입니다.' });
      }

      await comment.update({ content });

      if (image) {
        const commentImage = await Image.findOne({ where: { CommentId: commentId } });
        if (commentImage) {
          await commentImage.update({ src: image });
        } else {
          await Image.create({
            type: 'comment',
            src: image,
            CommentId: comment.id
          });
        }
      } else {
        await Image.destroy({ where: { CommentId: commentId } });
      }
    }

    const fullComment = parentId
      ? await ReplyComment.findOne({
          where: { id: commentId },
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
        })
      : await Comment.findOne({
          where: { id: commentId },
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

    return res.status(200).json({ comment: fullComment, parentId });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/comment/delete', isLoggedIn, async (req, res, next) => {
  try {
    const { id, hasChild, replyId } = req.body;
    let postId;

    if (replyId) {
      const replyComment = await ReplyComment.findOne({
        where: { id, CommentId: replyId }
      });

      if (!replyComment) {
        return res.status(404).json({ message: '존재하지 않는 댓글입니다.' });
      }

      postId = replyComment.PostId;

      await UserHistory.destroy({
        where: {
          type: 'replyComment',
          PostId: postId,
          ReplyCommentId: replyComment.id
        }
      });

      await Image.update({ ReplyCommentId: null }, { where: { ReplyCommentId: id } });
      await ReplyComment.destroy({ where: { id } });

      const remainingReplies = await ReplyComment.count({ where: { CommentId: replyId } });
      if (remainingReplies === 0) {
        const parentComment = await Comment.findOne({ where: { id: replyId, isDeleted: true } });
        if (parentComment) {
          await Image.update({ CommentId: null }, { where: { CommentId: replyId } });
          await Comment.destroy({ where: { id: replyId } });
        }
      }

      return res.status(200).json({ id, replyId, postId });
    } else {
      const comment = await Comment.findOne({
        where: { id },
        include: [{ model: ReplyComment, as: 'Replies' }]
      });

      if (!comment) {
        return res.status(404).json({ message: '존재하지 않는 댓글입니다.' });
      }

      postId = comment.PostId;

      await UserHistory.destroy({
        where: {
          type: 'comment',
          PostId: postId,
          CommentId: comment.id
        }
      });

      if (hasChild) {
        await Comment.update({ isDeleted: true }, { where: { id } });
      } else {
        await Image.update({ CommentId: null }, { where: { CommentId: id } });
        await Comment.destroy({ where: { id } });
      }

      return res.status(200).json({ id, hasChild, postId });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/like/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOne({
      where: { id: postId }
    });

    if (!post) {
      return res.status(403).send({ message: '게시글이 존재하지 않습니다.' });
    }

    await post.addLiker(req.user!.id);

    UserHistory.create({
      type: 'like',
      PostId: post.id,
      AlerterId: req.user!.id,
      AlertedId: post.UserId,
      isRead: false
    });

    res.status(200).json({ PostId: post.id, UserId: req.user!.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/like/:postId', isLoggedIn, async (req, res, next) => {
  try {
    const { postId } = req.params;

    const post = await Post.findOne({
      where: { id: postId }
    });

    if (!post) {
      return res.status(403).send({ message: '게시글이 존재하지 않습니다.' });
    }

    await post.removeLiker(req.user!.id);

    await UserHistory.destroy({
      where: {
        type: 'like',
        PostId: post.id
      }
    });
    res.status(200).json({ PostId: post.id, UserId: req.user!.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.get('/activities', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const where = { isRead: false, AlertedId: userId, AlerterId: { [Op.ne]: userId } };

    const [likeCount, commentCount, replyCount, followCount] = await Promise.all([
      UserHistory.count({ where: { ...where, type: 'like' } }),
      UserHistory.count({ where: { ...where, type: 'comment' } }),
      UserHistory.count({ where: { ...where, type: 'replyComment' } }),
      UserHistory.count({ where: { ...where, type: 'follow' } })
    ]);

    res.status(200).json({ like: likeCount, comment: commentCount + replyCount, follow: followCount });
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/activities', isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.user!.id;
    const { targetId } = req.body;

    if (targetId === 'all') {
      await UserHistory.update(
        { isRead: true },
        {
          where: {
            AlertedId: userId,
            AlerterId: { [Op.ne]: userId }
          }
        }
      );
    } else {
      await UserHistory.update({ isRead: true }, { where: { id: targetId } });
    }

    return res.status(200).json(targetId);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

export default router;
