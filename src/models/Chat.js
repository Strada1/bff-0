const { ObjectId } = require('mongodb');
const mongoose = require('../db');

const ChatSchema = mongoose.Schema({
  title: String,
  users: [{ type: ObjectId, ref: 'User' }],
  owner: { type: ObjectId, ref: 'User' },
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
