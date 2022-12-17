const {ObjectId} = require("mongodb");
const {getByIdUserService, createUserService, getUsersService} = require("../../service/userService");
const {generateToken} = require("../../helpers/token");

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
    return getByIdUserService(userId);
}

async function getTokenUserFixture() {
    return (await getExistUserFixture()).token
}

async function getExistUserFixture() {
    let user = (await getUsersService())[0];
    if (!user) {
        const { email, username, password } = await getUserFixture();
        const token = await generateToken({email, password})
        user = await createUserService({email, username, token});
    }
    return user;
}

function getUpdatedUserFixture(user) {
    const { username, chats } = user;
    return { username: `a${username}`, chats }
}

async function getUserNotInChatFixture(chatId) {
    const users = await getUsersService();
    return users.find((_user) => !_user.chatId.includes(ObjectId(chatId))) ?? await createUserService(await getUserFixture())
}

module.exports = {
    getUserFixture,
    getIdUserFixture,
    getByIdUserFixture,
    getExistUserFixture,
    getUpdatedUserFixture,
    getUserNotInChatFixture,
    getTokenUserFixture,
}