const mysql = require('../db.js');

const Like = mysql.define('like', {}, { timestamps: false });

module.exports = Like;
