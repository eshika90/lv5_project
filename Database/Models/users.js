const Sq = require('sequelize');
const DataTypes = Sq.DataTypes;
const mysql = require('../db');
const Post = require('./posts.js');
const Comment = require('./comments.js');

const User = mysql.define('user', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

module.exports = User;
