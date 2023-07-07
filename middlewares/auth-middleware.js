const jwt = require('jsonwebtoken');
const User = require('../Database/Models/users.js');
const config = require('../config.js');
const { secretKey } = config.jwt;

async function isAuth(req, res, next) {
  // 쿠키로 accesstoken과 refreshtoken받아오기
  // express로 cookie를 읽어올때는 cookies로 받아와야 한다.
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  // acesstoken validation
  if (!accessToken) {
    return res
      .status(401)
      .json({ message: 'Access token이 존재하지 않습니다.' });
  }
  // refreshtoken validation
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: 'Refresh token이 존재하지 않습니다.' });
  }
  // 각 토큰의 유효성 검사
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
    res.cookie('AccessToken', newAccessToken);
    return res
      .status(201)
      .json({ message: 'Access Token을 새롭게 발급하였습니다.' });
  }
  const payload = getAccessTokenPayload(accessToken);
  if (!payload || !payload.userId) {
    return res.status(401).json({ errorMessage: '유효한 토큰이 아닙니다.' });
  }
  req.userId = payload.userId; // userId 값을 req 객체에 설정

  next(); // next() 함수 호출

  // access Token 검증 함수
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
  // access Token의 payload가져오는 함수
  function getAccessTokenPayload(accessToken) {
    try {
      const payload = jwt.verify(accessToken, secretKey);
      return payload;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
}

module.exports = isAuth;
