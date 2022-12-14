const {ObjectId} = require("mongodb");

async function getUserFixture() {
    return {
        email: 'string@test.ru',
        username: 'String',
        password: 'wqe12f54w'
    }
}

async function getIdUserFixture() {
    const { _id } = await getExistUserFixture();
    return _id
}

async function getByIdUserFixture(userId) {
    return await getByIdUserService(userId)
}

async function getExistUserFixture() {
    return (await getUserService())[0];
}

async function getUpdatedUserFixture(user) {
    const { email, username } = user;
    return { ...user, email: `a${email}`, username: `a${username}` }
}

async function getUserNotInChatFixture(chatId) {
    const users = await getUserService();
    return users.find((_user) => !_user.chatId.includes(ObjectId(chatId))) ?? await createUserService(await getUserFixture())
}

module.exports = {
    getUserFixture,
    getIdUserFixture,
    getByIdUserFixture,
    getExistUserFixture,
    getUpdatedUserFixture,
    getUserNotInChatFixture,
}