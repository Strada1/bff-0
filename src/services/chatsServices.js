const Chat = require('../models/Chat');
const User = require('../models/User');

const createChat = async (userId, { title, users }) => {
  if (Array.isArray(users)) {
    const chat = await Chat.create({
      title,
      owner: userId,
      users: [...new Set([userId, ...users])],
    });
    await User.findByIdAndUpdate(userId, { $addToSet: { chats: chat._id } });
    await User.updateMany(
      { _id: { $in: users } },
      { $addToSet: { chats: chat._id } }
    );
    return chat;
  }
  const chat = await Chat.create({title, owner: userId, users: [userId]});
  await User.findByIdAndUpdate(userId, { $addToSet: { chats: chat._id } });
  return chat;
};

module.exports = {
  createChat,
};
