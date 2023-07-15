const CommentsRepository = require('../Repository/commentsRepository');

class CommentsService {
  commentsRepository = new CommentsRepository();
  // 게시글의 댓글 찾기 : 저장소에 찾아오라고 함
  findAllComments = async (postId) => {
    const commentData = await this.commentsRepository.findAllComments(postId);
    return commentData.map((d) => {
      return {
        commentId: d.commentId,
        userId: d.userId,
        comment: d.comment,
        createdAt: d.createdAt,
        updatedAt: d.updatedAt,
      };
    });
  };
  // 게시글의 댓글 작성
  createComment = async (postId, foundUser, comment) => {
    const { userId, nickname } = foundUser;
    const createCommentData = await this.commentsRepository.createComment(
      postId,
      userId,
      nickname,
      comment
    );
    return createCommentData;
  };
  // 게시글의 댓글 수정
  updateComment = async (id, foundUser, body) => {
    const comment = body.comment;
    const { userId, nickname } = foundUser;
    const updateCommentData = await this.commentsRepository.updateComment(
      id,
      nickname,
      userId,
      comment
    );
    return updateCommentData;
  };

  deleteComment = async (id, foundUser) => {
    const userId = foundUser.userId;
    return await this.commentsRepository.deleteComment(id, userId);
  };
}
module.exports = CommentsService;
