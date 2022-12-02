const jwt = require('jsonwebtoken');
const User = require('../models/User');

const UserRoles = {
  user: 'user',
  admin: 'admin',
};

const getAllUsers = async () => {
  const users = await User.find({}).lean();
  return users;
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
    return user;
  }
  return false;
};

const updateUser = async (id, { username, email }) => {
  return User.findByIdAndUpdate(id, { username, email }, { new: true });
};

const updateUserRoles = async (id, { roles }) => {
  if (!roles || roles.length === 0) {
    return false;
  }
  const validRoles = roles.filter((role) => {
    return Object.values(UserRoles).includes(role);
  });

  return User.findByIdAndUpdate(id, { roles: validRoles }, { new: true });
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = {
  getAllUsers,
  createUser,
  authUser,
  UserRoles,
  updateUser,
  updateUserRoles,
  deleteUser,
};
