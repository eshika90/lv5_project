const Post = require('../Database/Models/posts');
const User = require('../Database/Models/users.js');

module.exports = {
  createPost: async (req, res) => {
    const { title, content } = req.body;
    const foundUser = res.locals.foundUser;
    try {
      await Post.create({
        title,
        content,
        UserId: foundUser.id,
        nickname: foundUser.nickname,
      });
      res.status(200).json({ message: '게시글 업로드 성공!' });
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ errorMessage: '댓글 작성을 실패하였습니다.' });
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
    const foundUser = res.locals.foundUser;
    const foundPost = await Post.findOne({ where: { id } });
    try {
      if (foundUser.id !== foundPost.UserId) {
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
    } catch (e) {
      console.error(e);
      res.status(400).json({ errorMessage: '게시글 수정에 실패하였습니다.' });
    }
  },
  deletePost: async (req, res, next) => {
    const { id } = req.params;
    const foundUser = res.locals.foundUser;
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
