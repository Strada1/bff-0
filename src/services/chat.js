const Chat = require('../models/Chat');
const User = require('../models/User');
const { userRoles } = require('./user');

const getChats = () => {
  return Chat.find().lean();
};

const getChat = (id) => {
  return Chat.findById({ _id: id }).lean().populate('messages');
};

const createChat = async (id, { title, users }) => {
  const chat = await Chat.create({ title, owner: id, users: [id, ...users] });
  await User.findByIdAndUpdate(id, { $addToSet: { chats: chat._id } });
  await User.updateMany(
    { _id: { $in: users } },
    { $addToSet: { chats: chat._id } }
  );
  return chat;
};

const deleteChat = async (user, id) => {
  const chat = await Chat.findById({_id: id});
  if (chat.owner === user._id || user.roles.includes(userRoles.admin)) {
    await User.updateMany({}, { $pull: { chats: id } });
    return Chat.findByIdAndDelete({ _id: id }).lean();
  }
  return false;
};

const updateChat = async (user, id, { title }) => {
  const chat = await Chat.findById({_id: id});
  if (chat.users.includes(user._id) || user.roles.includes(userRoles.admin)) {
    return Chat.findByIdAndUpdate({ _id: id }, { title }, {
      new: true
    }).lean();
  }
  return false;
};

module.exports = {
  getChats,
  getChat,
  createChat,
  deleteChat,
  updateChat
};