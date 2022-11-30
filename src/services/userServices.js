const jwt = require('jsonwebtoken');
const User = require('../models/User');

const UserRoles = {
  user: 'user',
  admin: 'admin',
};

const createUser = async ({ email, username, password }) => {
  const user = await User.findOne({ email });
  const token = await jwt.sign({ email, password }, process.env.JWT_SECRET);

  if (!user) {
    return User.create({ email, username, token, roles: [UserRoles.user] });
  }
  return false;
};

const authUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }
  const decoded = jwt.decode(user.token);
  if (password === decoded.password) {
    return user.token;
  }
  return false;
};

const findUserByToken = async (token) => {
  const user = await User.findOne({token});
  if (user) {
    return user;
  }
  return false;
};

module.exports = {
  createUser,
  authUser,
  UserRoles,
  findUserByToken,
};
