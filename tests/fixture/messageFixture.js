const {getExistUserFixture} = require("./userFixture");
const {getExistChatFixture} = require("./chatFixture");

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

module.exports = {
    getMessageFixture,
}