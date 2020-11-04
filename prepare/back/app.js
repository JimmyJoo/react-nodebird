const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const postRouter = require('./routers/post');
const userRouter = require('./routers/user');
const db = require('./models');
const passportConfig = require('./passport');

const app = express();

db.sequelize.sync().then(() => {
  console.log('db 연결 성공');
});

passportConfig();

app.use(
  cors({
    origin: true,
    credentials: false,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session());
app.use(passport.initialize());
app.use(passport.session());

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행 중...');
});
