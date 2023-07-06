const express = require('express');
const router = express.Router();
// middleware
const isAuth = require('../middlewares/auth-middleware.js');
const validator = require('../Middlewares/validation.js');
const userController = require('../Controller/usersController.js');

router.post('/signup', userController.create);

router.post('/login', userController.login);

module.exports = router;
