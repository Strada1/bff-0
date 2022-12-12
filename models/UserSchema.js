const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    token: String,
    chats: [{type: 'ObjectId', ref: 'Chat'}],
});

module.exports = mongoose.model('User', UserSchema);