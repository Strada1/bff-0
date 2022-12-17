const Chat = require('../../models/ChatSchema');
const Message = require('../../models/MessageSchema');
const User = require('../../models/ChatSchema');

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