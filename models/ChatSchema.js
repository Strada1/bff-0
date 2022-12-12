const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    title: String,
    users: [{type: 'ObjectId', ref: 'User'}],
});

module.exports = mongoose.model('Chat', ChatSchema);