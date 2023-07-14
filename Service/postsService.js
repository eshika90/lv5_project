const PostsRepository = require('../Repository/postsRepository');

class PostsService {
  postsRepository = new PostsRepository();
  // 전체 게시글
  findAllPosts = async () => {
    const allPosts = await this.postsRepository.findAllPosts();

    allPosts.sort((a, b) => {
      return b.createdAt - a.createdAt;
      // sort a-b 오름차순, b-a 내림차순
    });
    return allPosts.map((p) => {
      return {
        postId: p.postId,
        nickname: p.nickname,
        title: p.title,
        likeCount: p.likeCount,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      };
    });
  };

  // 게시글 상세조회
  findPost = async (postId) => {
    const post = await this.postsRepository.findPost(postId);

    return post.map((p) => {
      return {
        postId: p.postId,
        nickname: p.nickname,
        title: p.title,
        content: p.content,
        likeCount: p.likeCount,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      };
    });
  };
  // 게시글 작성
  createPost = async (title, content, nickname) => {
    const createPostData = await this.postsRepository.createPost(
      title,
      content,
      nickname
    );

    return {
      postId: createPostData.null, // null로 둔 이유?
      nickname: createPostData.nickname,
      title: createPostData.title,
      content: createPostData.content,
      createdAt: createPostData.createdAt,
      updatedAt: createPostData.updatedAt,
    };
  };
  // 게시글 수정
  updatePost = async (postId, userId, title, content) => {
    const updatedPostData = await this.postsRepository.updatePost(
      postId,
      userId,
      title,
      content
    );

    return {
      postId: updatedPostData.postId,
      nickname: updatedPostData.nickname,
      title: updatedPostData.title,
      content: updatedPostData.content,
      createdAt: updatedPostData.createdAt,
      updatedAt: updatedPostData.updatedAt,
    };
  };
  // 게시글 삭제
  deletePost = async (postId, userId) => {
    return await this.postsRepository.deletePost(postId, userId);
  };
  // 게시글 좋아요
  likePost = async (postId, userId) => {
    return await this.postsRepository.like(postId, userId);
  };
  // 유저가 좋아요한 게시글 불러오기
  userLikes = async (userId) => {
    return await this.postsRepository.findUserLikes(userId);
  };
}

module.exports = PostsService;
