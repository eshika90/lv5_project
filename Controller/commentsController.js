const Post = require('../Database/Models/posts.js');
const User = require('../Database/Models/users.js');
const Comment = require('../Database/Models/comments.js');

module.exports = {
  createComment: async (req, res, next) => {
    const { comment } = req.body;
    const { PostId } = req.params;
    const foundUser = res.locals.foundUser;
    try {
      await Comment.create({
        comment,
        UserId: foundUser.id,
        PostId: PostId,
      });
      res.status(200).json({ message: '댓글 업로드 성공!' });
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ errorMessage: '댓글 작성을 실패하였습니다.' });
    }
  },
  getComments: async (req, res, next) => {
    try {
      const getComments = await Comment.findAll({
        order: [[createdAt, 'DESC']],
      });
      return res.status(200).json({ data: getComments });
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ errorMessage: '댓글 작성을 실패하였습니다.' });
    }
  },
  updateComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { comment } = req.body;
      const foundUser = res.locals.foundUser;
      const foundComment = await Comment.findOne({ where: { id } });
      if (foundUser.id !== foundComment.UserId) {
        return res
          .status(401)
          .json({ errorMessage: '수정할 권한이 없습니다.' });
      }
      await Comment.update({ comment }, { where: { id } });
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ errorMessage: '댓글 작성을 실패하였습니다.' });
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const foundUser = res.locals.foundUser;
      const foundComment = await Comment.findOne({ where: { id } });
      if (foundUser.id !== foundComment.UserId) {
        return res
          .status(401)
          .json({ errorMessage: '삭제할 권한이 없습니다.' });
      }
      await Comment.destroy({ where: { id } });
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ errorMessage: '댓글 작성을 실패하였습니다.' });
    }
  },
};
