import Chat from '../models/Chat.js';

import { addChatToUserChats, deleteChatFromUserChats } from './users.js';
import ApiError from '../exceptions/apiError.js';
import { ROLES } from '../middlewares/passport.js';

export async function createChat({ userId, title }) {
  const isUsedTitle = await Chat.findOne({ title });
  if (isUsedTitle) {
    throw ApiError.BadRequest_404(`Chat with this title "${title}" already exists`);
  }

  const createdChat = await Chat.create({
    title,
    users: [userId],
    owner: userId,
  });

  await addChatToUserChats(userId, createdChat._id)

  return createdChat;
}

export function getChats({ filters } = {}) {
  const chats = Chat.find();

  if (filters?.user) {
    chats.where('users', filters.user);
  }

  if (filters?.owner) {
    chats.where('owner', filters.owner);
  }

  return chats;
}

export function getChat(id) {
  return Chat.findById(id);
}

export async function updateChat(chatId, user, { title }) {
  const chat = await Chat.findById(chatId);

  const userIsCannotUpdate = !chat.owner && chat.owner !== user._id && !user.roles.includes(ROLES.ADMIN);
  if (userIsCannotUpdate) {
    console.log(1111111111111111111);
    throw ApiError.Forbidden_403('You are not permitted to perform this action');
  }

  return Chat.findByIdAndUpdate(chatId, {
    title,
  }, {
    new: true,
  });
}

export async function addUserToChat(chatId, userId) {
  await addChatToUserChats(userId, chatId);
  return addUserToChatUsers(chatId, userId);
}

export async function deleteUserFromChat(chatId, userId) {
  await deleteChatFromUserChats(userId, chatId);
  return deleteUserFromChatUsers(chatId, userId);
}

export function addUserToChatUsers(chatId, userId) {
  return Chat.findByIdAndUpdate(chatId, {
    $addToSet: { users: userId },
  }, {
    new: true,
  });
}

export function deleteUserFromChatUsers(chatId, userId) {
  return Chat.findByIdAndUpdate(chatId, {
    $pull: { users: userId },
  }, {
    new: true,
  });
}
