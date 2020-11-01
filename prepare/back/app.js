const express = require('express');
const postRouter = require('./routers/post');
const db = require('./models');
const app = express();

db.sequelize.sync().then(() => {
  console.log('db 연결 성공');
});

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('서버 실행 중...');
});
