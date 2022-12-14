const {getExistUserFixture} = require("./userFixture");

async function getMessageFixture() {
    const user = await getExistUserFixture();
    const chat = await getExistChatFixture();
    return {
        userId: user._id,
        text: 'text',
        chatId: chat._id,
        createdAt: Date.now,
    }
}

async function getIdMessageFixture(chatId) {
    const { _id } = await getExistMessageFixture(chatId);
    return _id
}

async function getByIdMessageFixture(MessageId) {
    return await getByIdMessageService(MessageId)
}

async function getExistMessageFixture(chatId) {
    return (await getMessageService(chatId))[0];
}

async function getUpdatedMessageFixture(message) {
    const { text } = message;
    return { ...message, text: `a${text}` }
}

module.exports = {
    getMessageFixture,
    getIdMessageFixture,
    getByIdMessageFixture,
    getExistMessageFixture,
    getUpdatedMessageFixture
}