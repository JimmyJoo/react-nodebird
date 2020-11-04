const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const { Post, User } = require('../models');
const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log('router login: ', req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log('router error!');
      console.error(err);
      return next(err);
    }
    if (info) {
      console.log('info: ', info);
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.log('loginErr: ', loginErr);
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
          },
          {
            model: User,
            as: 'Followings',
          },
          {
            model: User,
            as: 'Followers',
          },
        ],
      });
      return res.status(200).send(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.post('/', async (req, res, next) => {
  try {
    console.log('req: ', req.body);
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    console.log('created hashed Password');
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    console.log('create a new user!');
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
