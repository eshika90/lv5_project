const jwt = require('jsonwebtoken');
const User = require('../Database/Models/users.js');
const config = require('../config.js');
const { secretKey } = config.jwt;

class isAuth {
  // AccessToken을 만드는 함수
  getAccessToken = async (userId) => {
    const token =
      'Bearer ' +
      jwt.sign({ userId }, secretKey, {
        expiresIn: config.jwt.expireIn,
      });
    return token;
  };
  // RefreshToken 을 만드는 함수
  getRefreshToken = async (userId) => {
    const token =
      'Bearer ' +
      jwt.sign({ userId }, secretKey, {
        expiresIn: config.jwt.expireIn2,
      });
    return token;
  };
  // 만든 토큰들 검증하는 함수
  verify = async (req, res, next) => {
    // 로그인 후 유저의 상태를 확인할 수 있도록
    // 구워진 쿠키를 요청받아온다.
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    // accessToken이 있으면 Bearer blahblah 이렇게 되있을거고
    // 빈칸을 기준으로 token값일 것
    if (accessToken) {
      let token = accessToken.split(' ')[1];
      // 받아온 token값이 맞는지 jwt의 옵션으로 확인한다
      // verift는 토큰과 시크릿키를 받아와서 확인.
      // 만약 유효하지 않다면 undefined가 전달되고
      // 유효하다면 복호화된 객체를 갖게된다.
      let payloadAccessToken = jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return false;
        } else {
          return decoded;
        }
      });
      // 복호화된 객체를 얻었다면 res.locals라는 express 프레임워크에서 제공하는
      // response객체의 속성을 사용하여 저장(res.locals)
      // 또한 res.locals.payload는 표준화된 변수명
      if (payloadAccessToken) {
        res.locals.payload = payloadAccessToken;
        next();
      } else {
        token = refreshToken.split(' ')[1];
        //
        let payloadRefreshToken = jwt.verify(
          token,
          secretKey,
          (err, decoded) => {
            if (err) {
              return false;
            } else {
              return decoded;
            }
          }
        );

        if (payloadRefreshToken) {
          const userId = payloadRefreshToken.userId;
          const user = await User.findByPk(userId);
          if (user && user.dataValues.token == refreshToken) {
            const newAccessToken = await auth.getAccessToken(userId);

            res.cookie('accessToken', newAccessToken);
            res.locals.payload = payloadRefreshToken;
            next();
          } else {
            if (!user) {
              return res.status(404).json({
                message: '회원이 존재하지 않습니다.',
              });
            }
            res.status(400).json({
              message: '토큰을 확인해주세요.',
            });
          }
        } else {
          res.status(400).json({
            message: '토큰이 만료되었습니다.',
          });
        }
      }
    } else {
      res.status(400).json({
        errorMessage: '로그인이 필요한 기능입니다.',
      });
    }
  };
}

module.exports = isAuth;
