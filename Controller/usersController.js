const UsersService = require('../Service/usersService.js');

class UsersController {
  constructor() {
    this.usersService = new UsersService();
  }
  // 회원가입 시 받아야할 것: nickname, password
  createUser = async (req, res, next) => {
    const { nickname, password } = req.body;
    try {
      const createUserData = await this.usersService.createUser(
        nickname,
        password
      );
      res.status(200).json({
        message: `닉네임 ${createUserData.nickname}으로 회원가입 되었습니다.`,
      });
    } catch (error) {
      console.error(error);
      res.status(401).json({ errorMessage: error.message });
    }
  };
  // 로그인 시 받아야 할 것: nickname, password
  login = async (req, res, next) => {
    const { nickname, password } = req.body;
    const userData = await this.usersService.login(nickname, password);
    // service로부터 결과를 받아오면 쿠키를 받아온다
    if (userData) {
      res.cookie('accessToken', userData.accessToken);
      res.cookie('refreshToken', userData.refreshToken);
      res.status(201).json({
        token: userData.accessToken,
        refreshToken: userData.refreshToken,
        message: '로그인 되었습니다.',
      });
    } else {
      res.status(401).json({ errorMessage: '로그인에 실패하였습니다.' });
    }
  };
}
module.exports = UsersController;
