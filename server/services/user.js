import User from '../models/User.js';
import ApiError from '../exceptions/apiError.js';
import { generateToken, decodeToken } from '../services/token.js';

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  MODERATOR: 'moderator',
};

export async function createUser({ email, password, username }) {
  const potentialUser = await User.findOne({ email });

  if (potentialUser) {
    throw ApiError.BadRequest(`User with this ${email} already exists`);
  }

  // TODO хешировать пароль

  const token = await generateToken({ email, password });

  return User.create({ email, username, token, roles: [ROLES.USER] });
}

// аутентификация
export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });

  const ERROR_MESSAGE = 'An error occurred while logging in. Check the entered email address and password, or create an account.';
  if (!user) {
    throw ApiError.BadRequest(ERROR_MESSAGE);
  }

  const decodedToken = await decodeToken(user.token);

  if (password !== decodedToken.password) {
    throw ApiError.BadRequest(ERROR_MESSAGE);
  }

  return user.token;
}

export function updateUser(id, { email, password, username }) {
  return User.findByIdAndUpdate(id, { email, password, username });
}
