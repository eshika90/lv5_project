// squelize 라이브러리와 config.js를 사용하기 위한 작업
const Sq = require('sequelize');
const config = require('../config.js');

// config.js에 있는 정보를 가져와서 squelize모델을 만들기 위한 작업
const { database, host, password, username } = config.db;

const mysql = new Sq.Sequelize(database, username, password, {
  host: host,
  dialect: 'mysql',
});

module.exports = mysql;
