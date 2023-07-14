// 결과만 반환 / if문을 쓰지 말 것
const CommentsService = require('../Service/commentsService.js');

class CommentsController {
  commentsService = new CommentsService();
  // 댓글 조회시 필요한 클라이언트 정보: postId
  getComments = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const comments = await this.commentsService.findAllComments(postId);
      res.status(200).json({ data: comments });
    } catch (e) {
      console.error(e);
      res.status(400).json({ errorMessage: '댓글 조회를 실패하였습니다.' });
    }
  };
  // 댓글 작성시 필요한 클라이언트 정보: postId, user정보, comment
  createComment = async (req, res, next) => {
    const { postId } = req.params;
    const foundUser = req.user;
    // client에서 받은 데이터만 service에 전달
    try {
      const createCommentData = await this.commentsService.createComment(
        postId,
        foundUser,
        req.body
      );
      res
        .status(200)
        .json({ message: '댓글 작성 성공', data: createCommentData });
    } catch (e) {
      console.error(e);
      res.status(400).json({ errorMessage: '댓글 작성 실패!' });
    }
  };
  // 수정 시 필요한 클라이언트 정보: commentId, userId, comment
  updateComment = async (req, res, next) => {
    const { postId } = req.params;
    const foundUser = req.user;
    try {
      const updateCommentData = await this.commentsService.updateComment(
        postId,
        foundUser,
        req.body
      );
      res
        .status(200)
        .json({ data: updateCommentData, message: '댓글 수정 완료!' });
    } catch (e) {
      console.error(e);
      res.status(400).json({ errorMessage: '댓글 수정 실패!' });
    }
  };
  // 댓글 삭제시 필요한 클라이언트 정보: commentId, userId
  deleteComment = async (req, res, next) => {
    const { postId } = req.params;
    const foundUser = req.user;
    try {
      await this.commentsService.deleteComment(postId, foundUser);
      res.status(200).json({ message: '댓글이 삭제되었습니다.' });
    } catch (e) {
      console.error(e);
      res.status(400).json({ errorMessage: '댓글 삭제 실패!' });
    }
  };
}

module.exports = CommentsController;
