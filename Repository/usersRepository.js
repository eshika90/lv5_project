const User = require('../Database/Models/users');

class UserRepository {
  findNick = async (nickname) => {
    const foundNick = await User.findOne({ where: { nickname } });
    console.log(foundNick);
    return foundNick;
  };
  createUser = async (nickname, password) => {
    const userData = await User.create({ nickname, password });
    console.log(userData);
    return userData;
  };
  updateUserToken = async (id, refreshToken) => {
    await User.update({ refreshToken }, { where: { id } });
  };
}

module.exports = UserRepository;
