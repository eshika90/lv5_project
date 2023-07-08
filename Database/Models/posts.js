const Datatypes = require('sequelize').DataTypes;
const mysql = require('../db.js');

const Post = mysql.define('post', {
  id: {
    type: Datatypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
  nickname: {
    type: Datatypes.STRING,
    allowNull: false,
  },
  title: {
    type: Datatypes.STRING,
    allowNull: false,
  },
  content: {
    type: Datatypes.TEXT,
    allowNull: false,
  },
  likesCount: {
    type: Datatypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Post;
