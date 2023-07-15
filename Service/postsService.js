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
        postId: p.id,
        userId: p.userId,
        title: p.title,
        likeCount: p.likeCount,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      };
    });
  };

  // 게시글 상세조회
  findPost = async (id) => {
    const post = await this.postsRepository.findPost(id);

    return {
      postId: post.id,
      title: post.title,
      content: post.content,
      likeCount: post.likeCount,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };
  // 게시글 작성
  createPost = async (title, content, foundUser) => {
    const userId = foundUser.id;
    const createPostData = await this.postsRepository.createPost(
      title,
      content,
      userId
    );
    return { data: createPostData };
  };
  // 게시글 수정
  updatePost = async (id, foundUser, title, content) => {
    const userId = foundUser.id;
    const updatedPostData = await this.postsRepository.updatePost(
      id,
      title,
      content,
      userId
    );

    return { data: updatedPostData };
    // 있어야하나??
  };
  // 게시글 삭제
  deletePost = async (id, foundUser) => {
    const userId = foundUser.id;
    return await this.postsRepository.deletePost(id, userId);
  };
  // 게시글 좋아요
  likePost = async (id, foundUser) => {
    const userId = foundUser.id;
    return await this.postsRepository.like(id, userId);
  };
  // 유저가 좋아요한 게시글 불러오기
  userLikes = async (foundUser) => {
    const userId = foundUser.id;
    return await this.postsRepository.findUserLikes(userId);
  };
}

module.exports = PostsService;
