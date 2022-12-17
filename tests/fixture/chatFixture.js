const {getExistUserFixture, getUserNotInChatFixture} = require("./userFixture");
const {getByIdChatService, getChatsService, createChatService} = require("../../service/chatService");
const {getUsersService, updateUserService} = require("../../service/userService");
const {ObjectId} = require("mongodb");

async function getChatFixture() {
    return {
        title: 'string',
    }
}

async function getIdChatFixture() {
    const { _id } = await getExistChatFixture();
    return _id
}

async function getByIdChatFixture(chatId) {
    return getByIdChatService(chatId);
}

async function getExistChatFixture() {
    const user = await getExistUserFixture();
    const {chats} = user;
    const isEmpty = chats.length === 0;
    if (isEmpty) {
        const { title } = await getChatFixture();
        const chat = await createChatService({ title, users: [ ObjectId(user._id) ] });
        await updateUserService({userId: user._id, username: user.username, chats: [ ObjectId(chat._id) ]});
        return chat;
    }
    const chatId = chats[0]._id.toString()
    const chat = await getByIdChatService(chatId);
    if (!chat) {
        const chats = user.chats.filter((item) => item.toString() !== chatId);
        const updatedUser = await updateUserService({ userId: user._id, ...user, chats });
        return getExistChatFixture();
    }
    console.log('1', chat, chatId, chats, user);
    return chat;
}

async function getUpdatedChatFixture(chat) {
    const { title, users } = chat;
    return { title: `a${title}`, users }
}

module.exports = {
    getChatFixture,
    getIdChatFixture,
    getByIdChatFixture,
    getExistChatFixture,
    getUpdatedChatFixture,
}