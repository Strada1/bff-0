const jwt = require('jsonwebtoken');
const User = require('../models/User');

const UserRoles = {
  user: 'user',
  admin: 'admin',
};

const getAllUsers = async () => {
  const users = await User.find({}).populate('favorites').lean();
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
  const isMailBusy = await User.findOne({ email });
  if (isMailBusy) {
    return false;
  }
  return User.findByIdAndUpdate(id, { username, email }, { new: true }).select(
    'username email'
  );
};

const updateUserRoles = async (id, { roles }) => {
  if (!roles || roles.length === 0) {
    return false;
  }
  const validRoles = roles.filter((role) => {
    return Object.values(UserRoles).includes(role);
  });

  return User.findByIdAndUpdate(
    id,
    { roles: validRoles },
    { new: true }
  ).select('roles');
};

const deleteUser = async (id) => {
  return User.findByIdAndDelete(id);
};

const addFavorite = async (userId, { movie }) => {
  return User.findByIdAndUpdate(
    userId,
    { $addToSet: { favorites: movie } },
    { new: true }
  ).select('favorites username');
};

const deleteFavorite = async (id, { movie }) => {
  return User.findByIdAndUpdate(
    id,
    { $pull: { favorites: movie } },
    { new: true }
  ).select('favorites username');
};

module.exports = {
  getAllUsers,
  createUser,
  authUser,
  UserRoles,
  updateUser,
  updateUserRoles,
  deleteUser,
  addFavorite,
  deleteFavorite,
};
