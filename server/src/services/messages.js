import Message from '../models/Message.js';
import Chat from '../models/Chat.js';

import ApiError from '../exceptions/apiError.js';

export async function createMessage({ userId, chatId, text }) {
  const chat = await Chat.findById(chatId);

  if (chat && !chat.users.includes(userId)) {
    throw ApiError.Forbidden_403('You are not a member of the chat');
  }

  return Message.create({
    user: userId,
    text,
    chat: chatId,
  });
}

export async function getMessages({ chatId, user }) {
  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw ApiError.NotFound_404('Chat not found');
  }

  if (chat.users && !chat.users.includes(user._id)) {
    throw ApiError.Forbidden_403('You are not a member of the chat');
  }

  return Message.find({ chat: chatId }).populate('user');
}
