const Chat = require('src/models/Chat');

const createChat = async () => {
  return await Chat.create({
    users: [],
    title: 'test',
    messages: [],
  });
};

const deleteChat = (id) => {
  return Chat.findByIdAndDelete({ _id: id }).lean();
};

const updateChat = (id, { title }) => {
  return Chat.findByIdAndUpdate({ _id: id }, { title }).lean();
};

module.exports = {
  createChat,
  deleteChat,
  updateChat,
};
