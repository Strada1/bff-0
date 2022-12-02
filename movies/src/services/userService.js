const User = require('../models/User');
const jwt = require('jsonwebtoken');

const userRoles = { client: 'client', admin: 'admin' };

const getUser = (userId) => {
  return User.findById(userId).lean();
};

const createUser = ({ email, roles = [userRoles.client], token }) => {
  return User.create({ email, roles, token });
};

const updateUser = (userId, data) => {
  const { email, username, roles } = data;
  return User.findByIdAndUpdate({ _id: userId }, { email, username, roles }, {
    new: true
  }).lean();
};

const deleteUser = (userId) => {
  return User.findByIdAndDelete({ _id: userId }).lean();
};

const authUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) return undefined;
  const { token } = user;
  const decoded = jwt.decode(token);
  if (password === decoded.password) return token;
  return undefined;
};

const getUserByToken = async (token) => {
  const user = await User.findOne({ token });
  if (!user) return undefined;
  return user;
};

module.exports = {
  userRoles,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authUser,
  getUserByToken
};
