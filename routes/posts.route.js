// 기본 라이브러리
const express = require('express');
const router = express.Router();
// Controller
const PostController = require('../Controller/postsController');
const postController = new PostController();
// middleware
const isAuth = require('../middlewares/auth-middleware');
const defaultValidate = require('../middlewares/validation');
const isauth = new isAuth();
console.log(isauth.verify);
// 게시글 작성
router.post('/', isauth.verify, postController.createPost);

// 게시글 전체보기
router.get('/', postController.getPosts);
// 게시글 상세조회
router.get('/:postId', postController.getPost);
// 게시글 수정
router.put('/:postId', postController.updatePost);
// 게시글 삭제
router.delete('/:postId', postController.deletePost);

// 게시글 좋아요
router.put('/like/:postId', postController.likePost);
// 특정 유저가 좋아요한 게시글 전체보기
router.get('/likelist', postController.likeList);

module.exports = router;
