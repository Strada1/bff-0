const Message = require('../../src/models/Message');

const createMessage = async () => {
  return await Message.create({
    text: 'test message',
    createdAt: new Date(),
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
