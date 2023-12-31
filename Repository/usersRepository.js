const User = require('../Database/Models/users');

class UserRepository {
  findNick = async (nickname) => {
    const foundNick = await User.findOne({ where: { nickname } });
    return foundNick;
  };
  createUser = async (nickname, hashedPassword) => {
    console.log(nickname);
    const userData = await User.create({ nickname, password: hashedPassword });
    return userData;
  };
  updateUserToken = async (id, refreshToken) => {
    await User.update({ refreshToken }, { where: { id } });
  };
}

module.exports = UserRepository;
