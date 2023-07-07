const jwt = require('jsonwebtoken');
const User = require('../Database/Models/users.js');
const config = require('../config.js');
const { secretKey } = config.jwt;
let tokenObject = {};

async function isAuth(req, res, next) {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res
      .status(401)
      .json({ message: 'Access token이 존재하지 않습니다.' });
  }

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: 'Refresh token이 존재하지 않습니다.' });
  }

  const isAccessTokenValidate = validateAccessToken(accessToken);
  const isRefreshTokenValidate = validateRefreshToken(refreshToken);

  if (!isRefreshTokenValidate)
    return res.status(401).json({ message: 'Refresh Token이 만료되었습니다.' });

  if (!isAccessTokenValidate) {
    const accessTokenId = tokenObject[refreshToken];
    if (!accessTokenId)
      return res.status(401).json({
        errorMessage: 'Refresh token의 정보가 서버에 존재하지 않습니다.',
      });
    const newAccessToken = createAccessToken(accessTokenId);
    res.cookie('accessToken', newAccessToken);
    return res
      .status(201)
      .json({ message: 'Access Token을 새롭게 발급하였습니다.' });
  }

  const payload = getAccessTokenPayload(accessToken);
  if (!payload || !payload.id) {
    return res.status(401).json({ errorMessage: '유효한 토큰이 아닙니다.' });
  }

  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (user) {
      req.user = user; // 사용자 전체 정보를 req 객체에 설정
      next(); // next() 함수 호출
    } else {
      res.status(401).json({ errorMessage: '사용자를 찾을 수 없습니다.' });
    }
  } catch (e) {
    console.error(e);
    res.status(401).json({ errorMessage: '서버 오류입니다.' });
  }

  function validateAccessToken(accessToken) {
    try {
      jwt.verify(accessToken, secretKey);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  function validateRefreshToken(refreshToken) {
    try {
      jwt.verify(refreshToken, secretKey);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  function getAccessTokenPayload(accessToken) {
    try {
      const payload = jwt.verify(accessToken, secretKey);
      return payload;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  function createAccessToken(userId) {
    const accessToken = jwt.sign({ id: userId }, secretKey, {
      expiresIn: expiresIn,
    });
    return accessToken;
  }
}

module.exports = isAuth;
