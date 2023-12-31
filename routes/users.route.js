// 기본 라이브러리
const express = require('express');
const router = express.Router();
// middleware
const defaultValidate = require('../Middlewares/validation.js');
const isAuth = require('../Middlewares/auth-middleware');
const isauth = new isAuth();
// controller
const UserController = require('../Controller/usersController.js');
const userController = new UserController();

router.post('/signup', defaultValidate.createUser, userController.createUser);

router.post('/login', defaultValidate.login, userController.login);

// router.get('/getuser', isAuth.validateToken, userController.getUsers);

module.exports = router;
