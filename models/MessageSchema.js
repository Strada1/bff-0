const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    userId: {type: 'ObjectId', ref: 'User'},
    text: String,
    chatId: {type: 'ObjectId', ref: 'Chat'},
    createdAt: Date,
});

module.exports = mongoose.model('Message', MessageSchema);