const isAuth = require('../Middlewares/auth-middleware.js');
const UsersRepository = require('../Repository/usersRepository');
const bcrypt = require('bcrypt');
const config = require('../config.js');

class UsersService {
  usersRepository = new UsersRepository();
  isauth = new isAuth();
  createUser = async (nickname, password) => {
    const foundNick = await this.usersRepository.findNick(nickname);
    if (!foundNick) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const userData = await this.usersRepository.createUser(
        nickname,
        hashedPassword
      );
      return userData;
    } else {
      return { result: false };
    }
    // 닉네임 확인 후 user 정보 저장
  };
  login = async (nickname, password) => {
    // 유저 저장소에서 닉네임으로 user정보를 받아옴
    const user = await this.usersRepository.findNick(nickname);
    const passwordMatch = bcrypt.compareSync(
      password,
      user.dataValues.password
    );
    // 인증( 유저정보 유무, 패스워드 확인 )
    if (user && user.password == passwordMatch) {
      // 사용자 확인이 됐다면 userId를 인증미들웨어의 메소드로 보냄
      const accessToken = await this.isauth.getAccessToken(user.dataValues.id);
      const refreshToken = await this.isauth.getRefreshToken(
        user.dataValues.id
      );

      if (!accessToken) {
        return res.status(400).json({ message: 'access토큰 없음' });
      }
      if (!refreshToken) {
        return res.status(400).json({ message: 'refresh토큰 없음' });
      }
      // refreshToken db에 저장하라고 repo에 요청
      await this.usersRepository.updateUserToken(
        user.dataValues.id,
        refreshToken
      );
      // 미들웨어로부터 받은 토큰을 반환

      return { accessToken, refreshToken, result: true };
    } else {
      return { result: false };
    }
  };
  findUser = async (foundUser) => {
    const nickname = foundUser.nickname;
    try {
      const user = await this.usersRepository.findNick(nickname);
      if (user) {
        return user.map((u) => {
          return {
            id: u.id,
            nickname: u.nickname,
            createdAt: u.createdAt,
            updatedAt: u.updatedAt,
          };
        });
      } else {
        res.status(401).json({ errorMessage: '사용자를 찾을 수 없습니다.' });
      }
    } catch (e) {
      console.error(e);
      res.status(401).json({ errorMessage: '서버 오류입니다.' });
    }
  };
}
module.exports = UsersService;
