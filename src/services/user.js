const { User } = require('../models/user');
const { tokenService } = require('../utils/token');

class Service {
  create = async ( { email, username, password } ) => {
    const user = await User.findOne({ email });
    if (user) {
      return null;
    }

    const token = await tokenService.encrypt({ email, password });

    return User.create({ email, username, token });
  };
  get = () => {
    return User.find();
  };
  update = async ( userId, { username } ) => {
    return User.findByIdAndUpdate(
      userId,
      { username },
      { new: true },
    );
  };
  delete = ( userId ) => {
    return User.findByIdAndDelete(userId);
  };
  authenticate = async ( { email, password } ) => {
    const user = await User.findOne({ email });
    if (!user) return null;

    const { email: encryptedEmail, password: encryptedPassword } = await tokenService.decrypt(user.token);

    if (password === encryptedPassword) {
      return `${email} ${password}`;
    }

    return null;
  };
}

const userService = new Service();

module.exports = { userService };
