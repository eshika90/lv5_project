const User = require('../Database/Models/users');

class UserRepository {
  findNick = async (nickname) => {
    const foundNick = await User.findOne({ where: nickname });
    return foundNick;
  };
  createUser = async (nickname, password) => {
    const userData = await User.create(nickname, password);
    return userData;
  };
}

module.exports = UserRepository;
