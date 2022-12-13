const { ObjectId } = require('mongodb');
const mongoose = require('../db');

const MessageSchema = mongoose.Schema({
  user: { type: ObjectId, ref: 'User' },
  text: String,
  chat: { type: ObjectId, ref: 'Chat' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
