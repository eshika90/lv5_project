const User = require('./users.js');
const Post = require('./posts.js');
const Comment = require('./comments.js');
const Like = require('./likes.js');

User.hasMany(Post);
User.hasMany(Comment);

Post.belongsTo(User);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

User.belongsToMany(Post, {
  through: Like,
});
Post.belongsToMany(User, {
  through: Like,
  foreignKey: 'postId',
  as: 'LikedUsers',
});

Like.hasMany(Post, { foreignKey: 'postId' });
Like.hasMany(User, { foreignKey: 'userId' });

module.exports = [User, Post, Comment, Like];
