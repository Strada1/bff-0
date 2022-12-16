const jwt = require('jsonwebtoken');
const User = require('../../src/models/User');
const createUserData = require('./createUserData');

async function createUser(admin = false) {
  const userData = createUserData();
  const token = jwt.sign({ email: userData.email, random: Math.random() }, process.env.JWT_SECRET);
  userData.token = token;
  userData.roles = ['user'];
  if (admin) {
    userData.roles.push('admin');
  }
  return await User.create(userData);
}

module.exports = createUser;
