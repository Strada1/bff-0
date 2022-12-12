const mongoose = require('../db');
const { ObjectId } = require('mongodb');

const ChatSchema = new mongoose.Schema(
    {
        users: [{ type: ObjectId, ref: 'User' }],
        title: String,
        messages: [{ type: ObjectId, ref: 'Message' }]
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('Chat', ChatSchema);