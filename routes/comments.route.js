const express = require('express');
const router = express.Router();
const commentController = require('../Controller/commentsController');
const isAuth = require('../middlewares/auth-middleware');
const defaultValidate = require('../Middlewares/validation');

// 댓글 작성
router.post(
  '/:postId',
  defaultValidate.createComment,
  commentController.createComment
);

// 댓글 조회
router.get('/:postId', commentController.getComments);

// 댓글 수정
router.put(
  '/:id',
  isAuth,
  defaultValidate.updatePost,
  commentController.updateComment
);

// 댓글 삭제
router.delete('/:id', isAuth, commentController.deleteComment);

module.exports = router;
