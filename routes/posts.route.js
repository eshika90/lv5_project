// 기본 라이브러리
const express = require('express');
const router = express.Router();
// Controller
const PostController = require('../Controller/postsController');
const postController = new PostController();
// middleware
const isAuth = require('../Middlewares/auth-middleware');
const defaultValidate = require('../Middlewares/validation');
const isauth = new isAuth();
// 게시글 작성
router.post(
  '/',
  isauth.verify,
  defaultValidate.createPost,
  postController.createPost
);

// 게시글 전체보기
router.get('/', postController.getPosts);
// 게시글 상세조회
router.get('/:id', postController.getPost);
// 게시글 수정
router.put(
  '/:id',
  isauth.verify,
  defaultValidate.updatePost,
  postController.updatePost
);
// 게시글 삭제
router.delete('/:id', isauth.verify, postController.deletePost);

// 게시글 좋아요
router.put('/like/:id', isauth.verify, postController.likePost);
// 특정 유저가 좋아요한 게시글 전체보기
router.get('/likelist', isauth.verify, postController.likeList);

module.exports = router;
