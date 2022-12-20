const Message = require('../models/Message');
const Chat = require('../models/Chat');
const { userRoles } = require('./user');

const getMessages = async (user, id) => {
  const chat = await Chat.findById({ _id: id });
  if (chat.users.includes(user._id) || user.roles.includes(userRoles.admin)) {
    return Message.find({ chat: id }).lean().populate('user');
  } 
  return false;
};

const getMessage = (id) => {
  return Message.findById({ _id: id }).lean().populate('user');
};

const createMessage = async (data) => {
  const { user, text, chatId } = data;
  const chat = await Chat.findById({ _id: chatId });
  if (chat.users.includes(user)) {
    const message = await Message.create({ user, text, chatId, createdAt: new Date() });
    await Chat.findByIdAndUpdate(chatId, { $push: { messages: message._id } });
    return message;
  }
  return false;
};

const deleteMessage = async (user, id) => {
  const message = Message.findById({ _id: id });
  if (message.user === user._id) {
    return Message.findByIdAndDelete({ _id: id }).lean();
  }
  return false;
};

const updateMessage = (user, id, { text }) => {
  const message = Message.findById({ _id: id });
  if (message.user === user._id) {
    return Message.findByIdAndUpdate({ _id: id }, { text, updatedAt: new Date() }, {
      new: true
    }).lean();
  }
  return false;
};

module.exports = {
  getMessages,
  getMessage,
  createMessage,
  deleteMessage,
  updateMessage
};