const Datatypes = require('sequelize').DataTypes;
const mysql = require('../db.js');
const Post = require('./posts.js');
const Comment = require('./comments.js');

const User = mysql.define('user', {
  id: {
    type: Datatypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nickname: {
    type: Datatypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Datatypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Post);
User.hasMany(Comment);

module.exports = User;
