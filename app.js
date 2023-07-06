// 서버를 만들기 위한 작업
const express = require('express');
const app = express();
// cookieparser
const cookieParser = require('cookie-parser');

// router
const router = require('./routes/index.js');

// config
const config = require('./config.js');

// DB - mysql
const mysql = require('./Database/db.js');
const models = require('./Database/Models/index.js');

app.use(express.json());
app.use(cookieParser());
app.use('/', router);

// sequelize를 사용해 MySQL DB와 동기화 => 포트번호 확인
async () => {
  (await mysql.sync()).then(() => {
    app.listen(config.port, () => {
      console.log(`${config.port}번 포트가 열렸습니다!`);
    });
  });
};
