const mongoose = require('../db');
const { ObjectId } = require('mongodb');

const UserSchema = new mongoose.Schema(
    {
        email: String,
        username: String,
        token: String,
        chats: [{ type: ObjectId, ref: 'Chat' }]
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('User', UserSchema);