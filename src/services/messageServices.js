const userRoles = require('../helpers/userRoles');
const Chat = require('../models/Chat');
const Message = require('../models/Message');

const createMessage = async ({ text, chat }, userId) => {
  const foundChat = await Chat.find({ _id: chat, user: userId });
  const isUserInChat = foundChat.length;
  if (!isUserInChat) {
    return false;
  }
  return Message.create({ user: userId, chat, text });
};

const deleteMessage = async (messageId, user) => {
  const message = await Message.find({ _id: messageId, user: user._id });
  const canDelete = message.length || user.roles.includes(userRoles.admin);
  if (!canDelete) {
    return false;
  }
  return Message.findByIdAndDelete(messageId);
};

const updateMessage = async (messageId, { text }, user) => {
  const message = await Message.find({ _id: messageId, user: user._id });
  const canUpdate = message.length || user.roles.includes(userRoles.admin);
  if (!canUpdate) {
    return false;
  }
  return Message.findByIdAndUpdate(
    messageId,
    { text, updatedAt: new Date() },
    { new: true }
  );
};

const getMessages = async (chatId, user) => {
  const chat = await Chat.find({ _id: chatId, users: user });
  const canGet = chat.length || user.roles.includes(userRoles.admin);
  if (!canGet) {
    return false;
  }
  return Message.find({ chat: chatId });
};

module.exports = {
  createMessage,
  deleteMessage,
  updateMessage,
  getMessages,
};
