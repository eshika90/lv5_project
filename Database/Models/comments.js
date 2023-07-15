const mysql = require('../db.js');
const DataTypes = require('sequelize').DataTypes;

const Comment = mysql.define('comment', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Comment;
