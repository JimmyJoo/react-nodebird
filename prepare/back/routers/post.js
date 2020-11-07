const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, Comment } = require('../models');

const router = express.Router();

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
        {
          model: User,
        },
      ],
    });
    res.status(201).send(fullPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.delete('/', (req, res) => {});

router.post(`/:postId/comment`, isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });
    res.status(201).send(comment);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
