const Chat = require('../../src/models/Chat');
const Message = require('../../src/models/Message');
const User = require('../../src/models/User');

async function dropUsersCollection() {
  await User.deleteMany({});
}

async function dropChatsCollection() {
  await Chat.deleteMany({});
}

async function dropMessagesCollection() {
  await Message.deleteMany({});
}

module.exports = {
  dropChatsCollection,
  dropMessagesCollection,
  dropUsersCollection,
};
