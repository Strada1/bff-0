import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '../models/User.js';

import { addUserToChatUsers, deleteUserFromChatUsers } from './chats.js';
import ApiError from '../exceptions/apiError.js';

export async function createUser({ email, password, nickname, username }) {
  const potentialUser = await User.findOne({ $or: [{ email }, { nickname }] });
  if (potentialUser) {
    if (email === potentialUser?.email) {
      throw ApiError.BadRequest_404(`User with this email "${email}" already exists`);
    }

    if (nickname === potentialUser?.nickname) {
      throw ApiError.BadRequest_404(`A user named "${nickname}" already exists`);
    }
  }

  // TODO хешировать пароль

  const token = jwt.sign({ email, password }, process.env.JWT_SECRET, { expiresIn: '30d' });
  return await User.create({ email, token, nickname, username, roles: ['user'] });
}

export async function loginUser({ email, password }) {
  const user = await User.findOne({ email });

  const ERROR_MESSAGE =
    'An error occurred while logging in. Check the entered email address and password, or create an account.';
  if (!user) {
    throw ApiError.BadRequest_404(ERROR_MESSAGE);
  }

  const decodedToken = await jwt.decode(user.token);

  if (password !== decodedToken.password) {
    throw ApiError.BadRequest_404(ERROR_MESSAGE);
  }

  return user;
}

export function getUser(id) {
  return User.findById(id).populate('chats');
}

export function getUsers() {
  return User.find({}).populate('chats');
}

export async function updateUser(filter, { password, nickname, username, roles, chats }) {
  if (mongoose.isValidObjectId(filter)) {
    const userId = filter;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      roles,
      chats,
    }, {
      new: true,
    });

    if (chats && chats.length > 0) {
      for (let chatId of chats) {
        await addUserToChatUsers(chatId, userId);
      }
    }

    return updatedUser;
  }

  const isUsedNickname = await User.findOne({ nickname });
  if (isUsedNickname) {
    throw ApiError.BadRequest_404(`A user named "${nickname}" already exists`);
  }

  const token = filter;
  let newToken;

  if (password) {
    const decodeToken = await jwt.decode(token);
    const oldPass = decodeToken.password;

    if (password !== oldPass) {
      newToken = jwt.sign({ password, email: decodeToken.email }, process.env.JWT_SECRET, { expiresIn: '30d' });
    }
  }

  return User.findOneAndUpdate({ token }, {
    nickname,
    username,
    token: newToken,
  }, {
    new: true,
  });

}

export async function deleteUser(userId) {
  const deletedUser = await User.findByIdAndDelete(userId);

  for (let chatId of deletedUser?.chats) {
    await deleteUserFromChatUsers(chatId, userId);
  }

  return deletedUser;
}

export function addChatToUserChats(userId, chatId) {
  return User.findByIdAndUpdate(userId, {
    $addToSet: { chats: chatId },
  }, {
    new: true,
  });
}

export function deleteChatFromUserChats(userId, chatId) {
  return User.findByIdAndUpdate(userId, {
    $pull: { chats: chatId },
  }, {
    new: true,
  });
}
