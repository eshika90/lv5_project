const PostsService = require('../Service/postsService');

class PostsController {
  constructor() {
    this.postsService = new PostsService();
  }
  // 모든 게시글 조회할 때 필요한 클라이언트 정보: 없음
  getPosts = async (req, res, next) => {
    const posts = await this.postsService.findAllPosts();
    res.status(200).json({ data: posts });
  };
  // 게시글 상세조회 시 보내줘야하는 것: postId
  getPost = async (req, res, next) => {
    const { id } = req.params;
    const post = await this.postsService.findPost(id);
    res.status(200).json({ data: post });
  };
  // 게시글 작성할 때 보내줘야하는 것: body, user정보
  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const foundUser = res.locals.payload;
    const createPostData = await this.postsService.createPost(
      title,
      content,
      foundUser
    );
    res.status(200).json({ data: createPostData });
  };
  // 게시글 수정할 때: postId, body, user정보
  updatePost = async (req, res, next) => {
    const { id } = req.params;
    const foundUser = res.locals.payload;
    // user정보 넣어야 함
    const { title, content } = req.body;
    const updatePostData = await this.postsService.updatePost(
      id,
      foundUser,
      title,
      content
    );
    res.status(200).json({ data: updatePostData });
  };
  // 삭제할 때: user정보, postId
  deletePost = async (req, res, next) => {
    const { id } = req.params;
    const foundUser = res.locals.payload;
    // user정보 넣어야 함
    const deleteResult = await this.postsService.deletePost(id, foundUser);
    res.status(200).json({ message: '게시글이 삭제되었습니다.' });
  };
  // client로부터 받아올 것: postId, userId
  likePost = async (req, res, next) => {
    try {
      const { id } = req.params;
      const foundUser = res.locals.payload;
      const likeResult = await this.postsService.likePost(id, foundUser);
      res.status(200).json({ message: '좋아요 처리' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ errorMessage: '좋아요 추가 중 오류 발생' });
    }
  };

  // client로부터 받아올 것: userId
  likeList = async (req, res, next) => {
    const foundUser = res.locals.payload;
    const userLikesData = await this.postsService.userLikes(foundUser);
    res.status(200).json({ data: userLikesData });
  };
}

module.exports = PostsController;
