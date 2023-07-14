const Post = require('../Database/Models/posts');
const User = require('../Database/Models/users');
const Like = require('../Database/Models/likes');

class PostsRepository {
  findAllPosts = async () => {
    const posts = await Post.findAll();
    return posts;
  };

  findPost = async (postId) => {
    const post = await Post.findByPk(postId);
    return post;
  };

  createPost = async (title, content, nickname) => {
    const createPostData = await Post.create({ title, content, nickname });
    return createPostData;
  };
  updatePost = async (postId, userId, title, content) => {
    const post = await Post.findByPk(postId);
    if (post.userId == userId) {
      const updatedPost = await post.update(title, content);
      return updatedPost;
    } else {
      return {
        message: '삭제 권한이 없습니다.',
      };
    }
  };
  deletePost = async (postId, userId) => {
    const post = Post.findByPk(postId);
    if (post.userId == userId) {
      await post.destroy();
      return { isSuccessful: true };
    } else {
      return {
        message: '삭제할 권한이 없습니다.',
      };
    }
  };
  like = async (postId, userId) => {
    // Like테이블에서 postId 찾기
    const postInLike = await Like.findByPk(postId);
    // Post테이블에서 postId 찾기
    const post = await Post.findByPk(postId);
    // 로그인한 유저와 Like테이블에서 찾은 userId가 같으면
    if (postInLike.userId == userId) {
      // LikeCount의 숫자를 감소시키고 Like테이블의 postId와 userId를 삭제
      await post.decrement('likeCount');
      await postInLike.destroy({ postId: postId, userId: userId });
    } else {
      await post.increment('likeCount');
      await postInLike.create({ postId: postId, userId: userId });
    }
  };
  findUserLikes = async (userId) => {
    // Like테이블에서 userId 모두 찾기
    const userLikes = await Like.findAll({ where: { userId } });
    if (userLikes) {
      return userLikes;
    } else {
      return { message: '해당 사용자의 좋아요한 게시글을 찾을 수 없습니다.' };
    }
  };
}

module.exports = PostsRepository;
