const { ObjectId } = require('mongodb');
const mongoose = require('../db');

const UserSchema = mongoose.Schema({
  email: String,
  username: String,
  token: String,
  chats: [{ type: ObjectId, ref: 'Chat' }],
  roles: [String],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
