const jwt = require('jsonwebtoken');
const User = require('../Database/Models/users.js');
const config = require('../config.js');

async function isAuth(req, res, next) {
  // 쿠키로 token과 refreshtoken받아오기
  const auth = req.cookie('Authorization');
  const token = auth.split(' ')[1];
  const refreshToken = req.cookie('refreshToken');
  // token validation
  if (!auth || !auth.startsWith('Bearer')) {
    return res.status(401).json({ message: 'auth token이 존재하지 않습니다.' });
  }
  // refreshtoken validation
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: 'Refreshtoken이 존재하지 않습니다.' });
  }

  try {
    const payload = jwt.verify(token, config.jwt.secretKey);
    if (payload) {
      const userId = payload.userId;
      const foundUser = await User.findByPk(userId);

      if (foundUser) {
        res.locals.foundUser = foundUser.dataValues;
        next();
      } else {
        res.status(400).json({ errorMessage: '존재하지 않는 회원입니다.' });
      }
    } else {
      return res
        .status(400)
        .json({ errorMessage: 'Token이 올바르지 않습니다.' });
    }
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: '요청이 잘못되었습니다.' });
  }
}

module.exports = isAuth;
