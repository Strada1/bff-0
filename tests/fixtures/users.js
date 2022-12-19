const User = require('../../src/models/User');
const jwt = require('jsonwebtoken');

const memberData = {
  email: 'testmailmember@mail.com',
  username: 'testusername',
  password: 'testpassword',
  chats: [],
  roles: ['member']
};

const adminData = {
  email: 'testmailadmin@mail.com',
  username: 'testusername',
  password: 'testpassword',
  chats: [],
  roles: ['admin']
};

const createUser = (isAdmin = false) => {
  const data = isAdmin ? adminData : memberData;
  data.token = jwt.sign(
    { email: data.email, password: data.password },
    'secretkeyfortest'
  );
  return User.create(data);
};

const deleteUser = (id) => {
  return User.findByIdAndDelete({ _id: id }).lean();
};

const updateUser = (id, { username }) => {
  return User.findByIdAndUpdate({ _id: id }, { username }).lean();
};

module.exports = {
  memberData,
  adminData,
  createUser,
  deleteUser,
  updateUser
};