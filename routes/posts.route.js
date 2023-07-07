const express = require('express');
const router = express.Router();
const postController = require('../Controller/postsController');
const isAuth = require('../middlewares/auth-middleware');
const defaultValidate = require('../Middlewares/validation');

// 게시글 작성
router.post('/', isAuth, defaultValidate.createPost, postController.createPost);

// 게시글 전체 조회
router.get('/', postController.getPosts);

// 게시글 상세 조회
router.get('/:id', postController.getPost);

// 게시글 수정
router.put(
  '/:id',
  isAuth,
  defaultValidate.updatePost,
  postController.updatePost
);

// 게시글 삭제
router.delete('/:id', isAuth, postController.deletePost);

module.exports = router;
