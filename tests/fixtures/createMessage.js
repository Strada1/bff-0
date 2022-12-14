const Message = require('../../src/models/Message');

const createMessage = async (userId, chatId, text) => {
  return await Message.create({ user: userId, chat: chatId, text });
};

module.exports = createMessage;
