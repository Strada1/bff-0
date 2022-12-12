import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import Movie from '../models/Movie.js';
import { ROLES } from '../middlewares/passport.js';
import ApiError from '../exceptions/apiError.js';

export async function createUser({ email, password, username }) {
  const isUsedEmail = await User.findOne({ email });
  if (isUsedEmail) {
    throw ApiError.BadRequest(`User with this "${email}" already exists`);
  }

  const isUsedUsername = await User.findOne({ username });
  if (isUsedUsername) {
    throw ApiError.BadRequest(`A user named "${username}" already exists`);
  }

  // TODO хешировать пароль

  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '30d' });
  return User.create({ email, username, token, roles: [ROLES.USER] });
}

// authentication
export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });

  const ERROR_MESSAGE = 'An error occurred while logging in. Check the entered email address and password, or create an account.';
  if (!user) {
    throw ApiError.BadRequest(ERROR_MESSAGE);
  }

  const decodedToken = await jwt.decode(user.token);

  if (password !== decodedToken.password) {
    throw ApiError.BadRequest(ERROR_MESSAGE);
  }

  return user.token;
}

export async function updateUser({ token }, { password, username }) {
  let newToken;
  if (password) {
    const decodeToken = await jwt.decode(token);
    const oldPass = decodeToken.password;

    if (password !== oldPass) {
      newToken = jwt.sign({ password, email: decodeToken.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    }
  }

  return User.findOneAndUpdate({ token }, { username, token: newToken }, {
    new: true,
  });
}

export async function updateUserById({ userId }, { password, username, roles }) {
  let newToken;
  if (password) {
    const user = await User.findOne({ _id: userId });
    const decodeToken = await jwt.decode(user.token);
    const oldPass = decodeToken.password;

    if (password !== oldPass) {
      newToken = jwt.sign({ password, email: user.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    }
  }

  return User.findByIdAndUpdate(userId, { username, roles, token: newToken }, {
    new: true,
  });
}

export function deleteUser(id) {
  return User.findByIdAndDelete(id);
}

export async function addMovieInFavorites(userId, movieId) {
  const movie = await Movie.findById(movieId);
  if (!movie) {
    throw ApiError.NotFound('No movie for this ID');
  }

  return User.findByIdAndUpdate(userId, {
    $addToSet: { favorites: movieId },
  }, {
    new: true,
  });
}

export async function deleteMovieFromFavorites(userId, movieId) {
  return User.findByIdAndUpdate(userId, {
    $pull: { favorites: movieId },
  }, {
    new: true,
  });
}

export async function getCountFavoritesFromAllUsers() {
  const arr = await User.aggregate([
    {
      // Добавляет в массив совпадающий документ из `from` коллекции
      $lookup: {
        from: 'movies',
        localField: 'favorites',
        foreignField: '_id',
        as: 'movie',
      },
    },
    // Отделяет документ для каждого элемента и возвращает полученный документ
    { $unwind: '$movie' },
    {
      $group: {
        _id: '$movie.title',
        requestsCount: { $sum: 1 },
      }
    },
  ]);

  return arr.reduce((accumulator, value) => {
    accumulator[value._id] = value.requestsCount;
    return accumulator;
  }, {})
}
