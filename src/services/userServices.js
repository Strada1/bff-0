const User = require('../models/User');

const UserRoles = {
  user: 'user',
  admin: 'admin',
};

const createUser = async ({ email, username, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return User.create({ email, username, password, roles: [UserRoles.user] });
  }
  return false;
};

const authUser = async ({ email, password }) => {
  return User.findOne({ email, password });
};

module.exports = {
  createUser,
  authUser,
  UserRoles
};
