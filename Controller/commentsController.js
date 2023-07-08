const Comment = require('../Database/Models/comments.js');

module.exports = {
  createComment: async (req, res, next) => {
    const { comment } = req.body;
    const { postId } = req.params;
    const foundUser = req.user;
    console.log(foundUser);
    try {
      const createdComment = await Comment.create({
        comment,
        userId: foundUser.id,
        postId: postId,
        nickname: foundUser.nickname,
      });
      res
        .status(200)
        .json({ message: '댓글 업로드 성공!', data: createdComment });
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ errorMessage: '댓글 작성을 실패하였습니다.' });
    }
  },
  getComments: async (req, res, next) => {
    try {
      const comments = await Comment.findAll({
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json({ data: comments });
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ errorMessage: '댓글 조회를 실패하였습니다.' });
    }
  },
  updateComment: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { comment } = req.body;
      const foundUser = req.user;
      const foundComment = await Comment.findOne({ where: { id } });
      if (foundUser.id !== foundComment.userId) {
        return res
          .status(401)
          .json({ errorMessage: '수정할 권한이 없습니다.' });
      }
      await Comment.update({ comment }, { where: { id } });
      const updatedComment = await Comment.findOne({ where: { id } });
      res.status(200).json({ data: updatedComment });
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
      const foundUser = req.user;
      const foundComment = await Comment.findOne({ where: { id } });
      if (foundUser.id !== foundComment.userId) {
        return res
          .status(401)
          .json({ errorMessage: '삭제할 권한이 없습니다.' });
      }
      await Comment.destroy({ where: { id } });
      res.status(200).json({ message: '댓글이 삭제되었습니다.' });
    } catch (e) {
      console.error(e);
      return res
        .status(400)
        .json({ errorMessage: '댓글 삭제를 실패하였습니다.' });
    }
  },
};
