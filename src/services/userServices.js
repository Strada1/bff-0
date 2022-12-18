const User = require('../models/User');
const jwt = require('jsonwebtoken');
const userRoles = require('../helpers/userRoles');

const getUsers = async () => {
  return User.find({});
};

const getUserById = async (userId) => {
  return User.findById(userId);
};

const createUser = async ({ email, username }) => {
  const isSameMail = await User.findOne({ email });
  if (isSameMail) {
    return false;
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET);
  return User.create({ email, username, token, roles: [userRoles.user] });
};

const updateUser = async (userId, { username, roles, chats }) => {
  const validRoles = roles
    ? roles.filter((role) => userRoles[role])
    : undefined;
  return User.findByIdAndUpdate(
    userId,
    { username, roles: validRoles, chats },
    { new: true }
  );
};

const deleteUser = async (userId) => {
  return User.findByIdAndDelete(userId);
};

const addChat = async (userId, chatId) => {
  return User.findByIdAndUpdate(
    userId,
    { $addToSet: { chats: chatId } },
    { new: true }
  );
};

const getUserByToken = async (token) => {
  return User.findOne({ token });
};

const deleteChat = async (userId, chatId) => {
  return User.findByIdAndUpdate(
    userId,
    { $pull: { chats: chatId } },
    { new: true }
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addChat,
  deleteChat,
  getUserByToken,
};
