const User = require('../models/User');
const { createToken } = require('../utils');
const jwt = require('jsonwebtoken');

const userRoles = { client: 'client', admin: 'admin' };

const getUser = (userId) => {
  return User.findById(userId).lean();
};

const createUser = ({ email, roles = [userRoles.client], token }) => {
  return User.create({ email, roles, token });
};

const updateUser = (userId, data) => {
  return User.findByIdAndUpdate({ _id: userId }, data, {
    new: true
  }).lean();
};

const deleteUser = (userId) => {
  return User.findByIdAndDelete({ _id: userId }).lean();
};

const authUser = async (email, password) => {
  const user = await User.findOne({ email });
  const { token } = user;
  const decoded = jwt.decode(token);
  if (password === decoded.password) return token;
};

const isAdmin = async (token) => {
  const user = await User.findOne({ token });
  return (user && user.roles.includes(userRoles.admin));
};

module.exports = {
  userRoles,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authUser,
  isAdmin
};
