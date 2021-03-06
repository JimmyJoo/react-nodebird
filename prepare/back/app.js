const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const postsRouter = require('./routers/posts');
const postRouter = require('./routers/post');
const userRouter = require('./routers/user');

const db = require('./models');
const passportConfig = require('./passport');
const { static } = require('express');

const app = express();

dotenv.config();

db.sequelize.sync().then(() => {
  console.log('db 연결 성공');
});

passportConfig();

app.use(
  cors({
    origin: true,
    credentials: true, // to share cookie between diff domains
  })
);
app.use('/', static(path.join(__dirname, 'uploads')));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행 중...');
});
