const Message = require('../../src/models/Message');

const createMessage = (userId, chatId) => {
  return Message.create({
    user: userId ?? undefined,
    text: 'test message',
    chatId: chatId ?? undefined
  });
};

const deleteMessage = (id) => {
  return Message.findByIdAndDelete({ _id: id }).lean();
};

const updateMessage = (id, { text }) => {
  return Message.findByIdAndUpdate({ _id: id }, { text }).lean();
};

module.exports = {
  createMessage,
  deleteMessage,
  updateMessage,
};
