const User = require('../../src/models/User');

const createUser = async () => {
  return await User.create({
    email: 'test@mail.com',
    username: 'testusername',
    chats: [],
  });
};

const deleteUser = (id) => {
  return User.findByIdAndDelete({ _id: id }).lean();
};

const updateUser = (id, { username }) => {
  return User.findByIdAndUpdate({ _id: id }, { username }).lean();
};

module.exports = {
  createUser,
  deleteUser,
  updateUser
};