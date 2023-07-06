const jwt = require('jsonwebtoken');
const User = require('../Database/Models/users');
const config = require('../config.js');
const { secretKey, expireIn, expireIn2 } = config.jwt;

module.exports = {
  create: async (req, res) => {
    const { nickname, password } = req.body;
    const foundData = await User.findOne({ where: { nickname } });
    if (!foundData) {
      const userCreate = await User.create({
        nickname,
        password,
      }).then((d) => {
        return d;
      });

      return res.status(201).json(created.toJSON());
    } else {
      return res.status(401).json({
        Success: false,
        message: '이미 존재하는 닉네임입니다.',
      });
    }
  },
  login: async (req, res) => {
    const { nickname, password } = req.body;
    try {
      const foundData = await User.findOne({ where: { nickname } });
      if (password == foundData.password) {
        // 비밀번호가 맞으면 token과 refreshtoken 발급
        const token = jwt.sign(
          {
            userId: foundData.dataValues.id,
          },
          secretKey,
          { expiresIn: expireIn2 } // 만료기간 120초
        );
        const refreshToken = jwt.sign({}, secretKey, { expiresIn: expireIn }); // 만료기간 1일
        // 쿠키로 Token과 refreshtoken 보냄
        res.cookie('Authorization', 'Bearer' + token);
        res.cookie('refreshToken', refreshToken);
        // 생성 됐으면 확인하기
        res.status(201).json({
          token: token,
          refreshToken: refreshToken,
          message: '로그인 되었습니다.',
        });
      } else {
        res.status(400).json({
          errorMessage: '닉네임과 비밀번호가 일치하지 않습니다.',
        });
      }
    } catch (e) {
      console.error(e);
      return res.status(401).json({ errorMessage: '잘못된 접근 방식입니다.' });
    }
  },
  getUser: (req, res) => {
    const user = res.locals.foundUser;

    res.status(200).json(JSON.parse(JSON.stringify(user)));
  },
};
