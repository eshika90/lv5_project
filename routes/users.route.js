const express = require('express');
const router = express.Router();
// middleware
const isAuth = require('../middlewares/auth-middleware.js');
const validator = require('../Middlewares/validation.js');
const userController = require('../Controller/usersController.js');

router.post('/signup', validator.createUser, userController.create);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/getUser', isAuth, userController.getUser);

module.exports = router;
