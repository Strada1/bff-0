const Chat = require('../../src/models/Chat');

const createChat = async (userId) => {
  return await Chat.create({ title: `testChat${userId}`, users: [userId] });
};

module.exports = createChat;