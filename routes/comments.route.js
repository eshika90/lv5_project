// 기본 라이브러리
const express = require('express');
const router = express.Router();
// Controller
const CommentController = require('../Controller/commentsController');
const commentController = new CommentController();

// middleware
const isAuth = require('../middlewares/auth-middleware');
const defaultValidate = require('../middlewares/validation');

// 게시글의 댓글 작성
router.post(
  '/:postId',
  isAuth.verify,
  defaultValidate.createComment,
  commentController.createComment
);

// 게시글의 댓글 조회
router.get('/:postId', commentController.getComments);

// 게시글의 댓글 수정
router.put(
  '/:id',
  isAuth.verify,
  defaultValidate.updateComment,
  commentController.updateComment
);

// 게시글의 댓글 삭제
router.delete('/:id', isAuth.verify, commentController.deleteComment);

module.exports = router;
