const User = require('../models/User');

const userRoles = {client: 'client', admin: 'admin'};

const getUser = (userId) => {
  return User.findById(userId).lean();
};

const createUser = ({ email, password, roles = [userRoles.client] }) => {
  return User.create({ email, password, roles });
};

const updateUser = (userId, data) => {
  return User.findByIdAndUpdate({ _id: userId }, data, {
    new: true
  }).lean();
};

const deleteUser = (userId) => {
  return User.findByIdAndDelete({ _id: userId }).lean();
};

const authUser = (email, password) => {
  return User.findOne(email, password);
};

const isAdmin = async (email, password) => {
  const user = await User.findOne({ email, password });
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
