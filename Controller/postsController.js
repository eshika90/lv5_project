const Post = require('../Database/Models/posts');
const User = require('../Database/Models/users');

module.exports = {
  createPost: async (req, res) => {
    const { title, content } = req.body;
    const foundUser = req.user;
    try {
      const post = await Post.create({
        title,
        content,
        userId: foundUser.id, // 수정: userId 필드에 값을 할당
        nickname: foundUser.nickname,
      });
      res.status(200).json({ message: '게시글 업로드 성공!', data: post });
    } catch (e) {
      console.error(e);
      res.status(400).json({ errorMessage: '게시글 작성을 실패하였습니다.' });
    }
  },
  getPosts: async (req, res, next) => {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']],
    });
    return res.status(200).json({ data: posts });
  },
  getPost: async (req, res, next) => {
    const { id } = req.params;
    try {
      const post = await Post.findOne({ where: { id } });
      return res.status(200).json({ data: post });
    } catch (e) {
      console.error(e);
      res
        .status(400)
        .json({ errorMessage: '게시글 상세조회에 실패하였습니다.' });
    }
  },
  updatePost: async (req, res, next) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const foundUser = req.user;
    const foundPost = await Post.findOne({ where: { id } });
    try {
      if (foundUser.id !== foundPost.userId) {
        return res
          .status(401)
          .json({ errorMessage: '수정할 권한이 없습니다.' });
      }
      await Post.update(
        { title, content },
        {
          where: { id },
        }
      );
      // 수정된 게시물을 다시 조회하여 반환
      const updatedPost = await Post.findOne({ where: { id } });
      res.status(200).json({ data: updatedPost });
    } catch (e) {
      console.error(e);
      res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다.' });
    }
  },
  deletePost: async (req, res, next) => {
    const { id } = req.params;
    const foundUser = req.user;
    const foundPost = await Post.findOne({ where: { id } });
    try {
      if (foundUser.id !== foundPost.id) {
        return res
          .status(401)
          .json({ errorMessage: '삭제할 권한이 없습니다.' });
      }
      await Post.destroy({ where: { id } });
      res.status(200).json({ message: '게시글을 삭제하였습니다.' });
    } catch (e) {
      console.error(e);
      res.status(400).json({ errorMessage: '게시글 삭제에 실패하였습니다.' });
    }
  },
};
