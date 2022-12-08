const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Movie = require('../models/Movie');

const userRoles = { client: 'client', admin: 'admin' };

const getUser = (userId) => {
  return User.findById(userId).lean();
};

const createUser = ({ email, roles = [userRoles.client], token }) => {
  return User.create({ email, roles, token });
};

const updateUser = (userId, data) => {
  const { username, roles, favorites } = data;
  return User.findByIdAndUpdate({ _id: userId }, { username, roles, favorites }, {
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

const addMovieToFavorites = (userId, movieId) => {
  return User.findByIdAndUpdate(userId, { $push: { favorites: movieId } }).lean();
};

const deleteMovieFromFavorites = (userId, movieId) => {
  return User.findByIdAndUpdate(userId, { $pull: { favorites: movieId } }).lean();
};

const getFavoriteMoviesCount = async() => {
  const counted = await User.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: 'favorites',
        foreignField: '_id',
        as: 'favoriteMovie',
      },
    },
    { $unwind: '$favoriteMovie' },
    {
      $group: { _id: '$favoriteMovie.title', count: { $sum: 1 } },
    },
  ]);
  const result = {};
  counted.forEach((film) => {
    result[film._id] = film.count;
  });
  return result;
};

module.exports = {
  userRoles,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  authUser,
  getUserByToken,
  addMovieToFavorites,
  deleteMovieFromFavorites,
  getFavoriteMoviesCount
};
