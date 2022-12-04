const { User } = require('../models/user');

class Service {
  create = async ( { email, username, password } ) => {
    const user = await User.findOne({ email });
    if (user) {
      return undefined;
    }

    return User.create({ email, username, password });
  };
  get = () => {
    return User.find();
  };
  update = ( userId, { username, password } ) => {
    return User.findByIdAndUpdate(
      userId,
      { username, password },
      { new: true },
    );
  };
  delete = ( userId ) => {
    return User.findByIdAndDelete(userId);
  };
  authenticate = async ( { email, password } ) => {
    const user = await User.findOne({ email });
    if (user.password === password) {
      return `${email} ${password}`;
    }

    return undefined;
  };
}

const userService = new Service();

module.exports = { userService };
