const mongoose = require('../db');
const { ObjectId } = require('mongodb');

const MessageSchema = new mongoose.Schema(
    {
        user: ObjectId,
        text: String,
        createdAt: Date,
        chatId: ObjectId
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Message', MessageSchema);