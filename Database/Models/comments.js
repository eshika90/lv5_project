const Datatypes = require('sequelize').DataTypes;
const mysql = require('../db.js');

const Comment = mysql.define('comment', {
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
  postId: {
    type: Datatypes.INTEGER,
    allowNull: false,
  },
  nickname: {
    type: Datatypes.STRING,
    allowNull: false,
  },
  comment: {
    type: Datatypes.TEXT,
    allowNull: false,
  },
});

module.exports = Comment;
