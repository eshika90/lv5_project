const Datatypes = require('sequelize').DataTypes;
const mysql = require('../db.js');
const Comment = require('./comments.js');
const User = require('./users.js');

const Post = mysql.define('post', {
  id: {
    type: Datatypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  UserId: {
    type: Datatypes.INTEGER,
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
});

Post.hasMany(Comment);

module.exports = Post;
