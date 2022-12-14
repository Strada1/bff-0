const {getExistUserFixture, getUserNotInChatFixture} = require("./userFixture");

async function getChatFixture() {
    const { userId } = await getExistUserFixture();
    return {
        title: 'string@test.ru',
        users: [ userId ],
    }
}

async function getIdChatFixture() {
    const { _id } = await getExistChatFixture();
    return _id
}

async function getByIdChatFixture(chatId) {
    return await getByIdChatService(chatId)
}

async function getExistChatFixture() {
    return (await getChatService())[0];
}

async function getUpdatedChatFixture(chat) {
    const newUser = await getUserNotInChatFixture(chat._id);
    const { title, user } = chat;
    return { ...chat, title: `a${title}`, user: [...user, newUser ] }
}

module.exports = {
    getChatFixture,
    getIdChatFixture,
    getByIdChatFixture,
    getExistChatFixture,
    getUpdatedChatFixture,
}