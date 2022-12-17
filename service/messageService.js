const Message = require("../models/MessageSchema");

const createMessageService = async ({ userId, text, chatId, createdAt = Date.now() }) => {
    return Message.create({ userId, text, chatId, createdAt });
}

const getInChatMessageService = (chatId) => {
    return Message.find({chatId});
}

module.exports = {
    createMessageService, getInChatMessageService
}