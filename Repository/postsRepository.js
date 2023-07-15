const Post = require('../Database/Models/posts');
const User = require('../Database/Models/users');
const Like = require('../Database/Models/likes');
const Op = require('sequelize').Op;

class PostsRepository {
  findAllPosts = async () => {
    const posts = await Post.findAll();
    return posts;
  };

  findPost = async (id) => {
    const post = await Post.findByPk(id);
    return post;
  };

  createPost = async (title, content, userId) => {
    const createPostData = await Post.create({
      title,
      content,
      userId,
    });
    return createPostData;
  };
  updatePost = async (id, title, content, userId) => {
    const post = await Post.findByPk(id);
    if (post.userId == userId) {
      const updatedPost = await post.update(
        { title, content },
        { where: { id } }
      );
      return updatedPost;
    } else {
      return {
        message: '삭제 권한이 없습니다.',
      };
    }
  };
  deletePost = async (id, userId) => {
    const post = await Post.findByPk(id);
    console.log('안녕', post);
    if (post.userId == userId) {
      await post.destroy();
      return { isSuccessful: true };
    } else {
      return {
        message: '삭제할 권한이 없습니다.',
      };
    }
  };
  like = async (id, userId) => {
    try {
      const post = await Post.findByPk(id);
      const postInLike = await Like.findOne({ where: { postId: id, userId } });
      if (postInLike) {
        await post.decrement('likeCount');
        await Like.destroy({ where: { postId: id, userId: userId } });
      } else {
        await post.increment('likeCount');
        await Like.create({ postId: id, userId: userId });
      }
    } catch (error) {
      return error;
    }
  };
  findUserLikes = async (userId) => {
    // Like테이블에서 userId 모두 찾기
    const likePostIds = await Like.findAll({
      where: { userId },
      attributes: ['postId'],
    });
    const likeList = await Post.findAll({
      where: { id: { [Op.in]: likePostIds.map((v) => v.postId) } },
      attributes: ['title'],
    });
    if (likePostIds) {
      return likeList;
    } else {
      return { message: '해당 사용자의 좋아요한 게시글을 찾을 수 없습니다.' };
    }
  };
}

module.exports = PostsRepository;
