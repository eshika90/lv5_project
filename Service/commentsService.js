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
  createComment = async (postId, foundUser, body) => {
    const comment = body.comment;
    const userId = foundUser.userId;
    const createCommentData = await this.commentsRepository.createComment(
      postId,
      userId,
      comment
    );
    return createCommentData;
  };
  // 게시글의 댓글 수정
  updateComment = async (commentId, foundUser, body) => {
    const comment = body.comment;
    const userId = foundUser.userId;
    const updateCommentData = await this.commentsRepository.updateComment(
      commentId,
      userId,
      comment
    );
    return updateCommentData;
  };

  deleteComment = async (commentId, foundUser) => {
    const userId = foundUser.userId;
    return await this.commentsRepository.deleteComment(commentId, userId);
  };
}
module.exports = CommentsService;
