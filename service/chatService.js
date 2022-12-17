const Chat = require('../models/ChatSchema');

const createChatService = async ({ title, users }) => {
    return Chat.create({ title, users });
}

const getChatsService = () => {
    return Chat.find();
}

const getByIdChatService = (id) => {
    return Chat.findById(id);
}

const updateChatService = ({ chatId, title, users }) => {
    return Chat.findByIdAndUpdate(chatId, { title, users }, { new: true, rawResult: true });
}

const deleteChatService = (chatId) => {
    return Chat.findByIdAndDelete(chatId);
}

module.exports = {
    createChatService, getChatsService, getByIdChatService, updateChatService, deleteChatService,
}