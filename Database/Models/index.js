// import Models
const User = require('./users.js');
const Post = require('./posts.js');
const Comment = require('./comments.js');
const Like = require('./likes.js');

// User 관계 (1:M)
User.hasMany(Post);
User.hasMany(Comment);

// M:1
Post.belongsTo(User);
Comment.belongsTo(User);

// Post <-> Comment 관계 (1:M)
Post.hasMany(Comment);
Comment.belongsTo(Post);

// M:N 관계
User.belongsToMany(Post, { through: Like, foreignKey: 'userId' });
Post.belongsToMany(User, {
  through: Like,
  as: 'LikeUser',
  foreignKey: 'postId',
});

// Like안에 테이블을 다른 테이블들에 주기 위함
Like.hasMany(Post, { foreignKey: 'id' });
Like.hasMany(User, { foreignKey: 'id' });

module.exports = [User, Post, Comment, Like];
