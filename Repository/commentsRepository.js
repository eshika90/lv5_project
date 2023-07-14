const Comment = require('../Database/Models/comments');

class CommentsRepository {
  findAllComments = async (postId) => {
    const commentData = await Comment.findAll({ where: postId });
    return commentData;
  };

  createComment = async (postId, userId, comment) => {
    try {
      const commentData = await Comment.create(postId, userId, comment);
      return commentData;
    } catch (e) {
      console.error(e);
      return { errorMessage: '댓글 repo 실패' };
    }
  };
  updateComment = async (commentId, userId, comment) => {
    const findComment = await Comment.findByPk(commentId);
    try {
      if (findComment.userId == userId) {
        const updateData = await findComment.update({ comment: comment });
        return { message: '댓글 수정 repo 성공' };
      } else {
        return { errorMessage: '댓글 수정 권한이 없습니다.' };
      }
    } catch (e) {
      console.error(e);
      return { errorMessage: '댓글 수정 repo 실패' };
    }
  };
  deleteComment = async (commentId, userId) => {
    const findComment = await Comment.findByPk(commentId);
    try {
      if (findComment.userId == userId) {
        await findComment.destroy();
        return { message: '댓글 삭제 repo 성공' };
      } else {
        return { errorMessage: '댓글 삭제 권한이 없습니다.' };
      }
    } catch (e) {
      console.error(e);
      return { errorMessage: '댓글 삭제 repo 실패' };
    }
  };
}
module.exports = CommentsRepository;
