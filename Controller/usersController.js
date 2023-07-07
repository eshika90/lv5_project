const jwt = require('jsonwebtoken');
const User = require('../Database/Models/users');
const config = require('../config.js');
const { secretKey, expireIn, expireIn2 } = config.jwt;
let tokenObject = {}; // Refresh Token을 저장할 Object

module.exports = {
  create: async (req, res) => {
    const { nickname, password } = req.body;
    try {
      const foundData = await User.findOne({ where: { nickname } });
      if (foundData) {
        return res
          .status(400)
          .json({ errorMessage: '이미 존재하는 닉네임입니다.' });
      }
      const userCreate = await User.create({
        nickname,
        password,
      });
      return res.status(200).json({ data: userCreate });
    } catch (e) {
      console.error(e);
      res.status(401).json({
        errorMessage: '알 수 없는 오류입니다.',
      });
    }
  },
  login: async (req, res) => {
    const { nickname, password } = req.body;
    try {
      const foundData = await User.findOne({ where: { nickname } });
      if (!foundData || password !== foundData.password) {
        return res.status(401).json({
          errorMessage: '닉네임 혹은 비밀번호가 일치하지 않습니다.',
        });
      }
      const id = req.params.id;
      const accessToken = generateAccessToken(foundData.id);
      const refreshToken = generateRefreshToken();
      // 위에서 선언한 저장소에 refresh token을 가지고 해당 유저의 정보를 서버에 저장
      tokenObject[refreshToken] = id;
      // 쿠키로 accessT 전송
      res.cookie('accessToken', accessToken);

      // 쿠키로 refreshT 전송
      res.cookie('refreshToken', refreshToken);
      res.status(200).json({
        token: accessToken,
        refreshToken: refreshToken,
        message: '로그인 되었습니다',
      });
      // accesstoken 생성 함수
      function generateAccessToken(userId) {
        return jwt.sign({ userId }, secretKey, { expiresIn: expireIn });
      }
      // refreshtoken 생성 함수
      function generateRefreshToken() {
        return jwt.sign({}, secretKey, { expiresIn: expireIn2 });
      }
    } catch (e) {
      console.error(e);
      return res.status(401).json({ errorMessage: '잘못된 접근 방식입니다.' });
    }
  },
  logout: (req, res) => {
    res.clearCookie('accessToken', 'refreshToken');
    res.end();
  },
  getUser: async (req, res) => {
    const userId = req.userId;

    try {
      const user = await User.findOne({ where: { id: userId } });
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(401).json({ errorMessage: '사용자를 찾을 수 없습니다.' });
      }
    } catch (e) {
      console.error(e);
      res.status(401).json({ errorMessage: '서버 오류입니다.' });
    }
  },
};
