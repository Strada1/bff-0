const userRoles = require('../helpers/userRoles');
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
  const chat = await Chat.create({ title, owner: userId, users: [userId] });
  await User.findByIdAndUpdate(userId, { $addToSet: { chats: chat._id } });
  return chat;
};

const deleteChat = async (chatId, user) => {
  const chat = await Chat.find({ _id: chatId, owner: user._id });
  const canDelete = chat.length || user.roles.includes(userRoles.admin);

  if (!canDelete) {
    return false;
  }

  await User.updateMany({}, { $pull: { chats: chatId } });
  return Chat.findByIdAndDelete(chatId);
};

const updateChat = async (chatId, { owner, title }, user) => {
  const chat = await Chat.find({ _id: chatId, owner: user._id });
  const canUpdate = chat.length || user.roles.includes(userRoles.admin);

  if (!canUpdate) {
    return false;
  }

  return Chat.findByIdAndUpdate(chatId, { owner, title }, { new: true });
};

const getChats = async () => {
  return Chat.find({});
};

const getChat = async (chatId) => {
  return Chat.findById(chatId);
};

const addUsers = async (chatId, { users }, user) => {
  const chat = await Chat.find({ _id: chatId, users: user._id });
  const canAdd = chat.length || user.roles.includes(userRoles.admin);

  if (!canAdd) {
    return false;
  }

  await User.updateMany(
    { _id: { $in: users } },
    { $addToSet: { chats: chatId } }
  );
  return Chat.findByIdAndUpdate(
    chatId,
    {
      $addToSet: { users: { $each: users } },
    },
    { new: true }
  );
};

const deleteUsers = async (chatId, { users }, user) => {
  const chat = await Chat.find({ _id: chatId, users: user._id });
  const canDelete = chat.length || user.roles.includes(userRoles.admin);

  if (!canDelete) {
    return false;
  }

  await User.updateMany({ _id: { $in: users } }, { $pull: { chats: chatId } });
  return Chat.findByIdAndUpdate(
    chatId,
    {
      $pullAll: { users: users },
    },
    { new: true }
  );
};

module.exports = {
  createChat,
  deleteChat,
  updateChat,
  getChats,
  getChat,
  addUsers,
  deleteUsers,
};
