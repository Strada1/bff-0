const request = require('supertest');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require('../app');
const { MONGO_CONNECTION_STRING } = dotenv.config().parsed;
const connectDataBase = require("../helpers/connectDataBase");
const {
    getChatFixture,
    getByIdChatFixture,
    getExistChatFixture,
    getUpdatedChatFixture,
} = require("./fixture/chatFixture");
const {getTokenUserFixture, getExistUserFixture} = require("./fixture/userFixture");

const getAuthorization = require("./helpers/getAuthorization");
const {dropChatsCollection, dropMessagesCollection, dropUsersCollection} = require("./helpers/dropCollections");

// jest
//     .spyOn(passport, 'authenticate')
//     .mockImplementation((req, res, next) => {
//         passport.authenticate('bearer', {session: false}, (err, user) => {
//             next();
//         })(req, res, next)
// })

jest
    .spyOn(console, 'log')
    .mockImplementation(() => undefined);

beforeEach(async () => {
    await connectDataBase(MONGO_CONNECTION_STRING)

    await dropChatsCollection();
    await dropMessagesCollection();
    await dropUsersCollection();
});

describe('chat', () => {
    it('POST', async () => {
        const authorization = await getAuthorization();
        const chat = await getChatFixture();
        const { body } = await request(app)
            .post('/api/chats')
            .set(authorization)
            .send(chat)
            .expect(201);
        await expect(body.title).toEqual(chat.title);
    })

    it('GET', async () => {
        const authorization = await getAuthorization();
        const chat = await getExistChatFixture();
        const chatId = chat._id.toString();
        const { body } = await request(app)
            .get(`/api/chats/${chatId}`)
            .set(authorization)
            .expect(200);
        await expect(body.title).toEqual(chat.title);
    })

    it('UPDATE', async () => {
        const authorization = await getAuthorization();
        const chat = await getExistChatFixture();
        const chatId = chat._id.toString();
        const updatedChat = await getUpdatedChatFixture(chat);
        const { body } = await request(app)
            .put(`/api/chats/${chatId}`)
            .set(authorization)
            .send(updatedChat)
            .expect(200);
        await expect(body.value.title).toEqual(updatedChat.title);
    })

    it('DELETE', async () => {
        const authorization = await getAuthorization();
        const chat = await getExistChatFixture();
        const chatId = chat._id;
        const { body } = await request(app)
            .delete(`/api/chats/${chatId}`)
            .set(authorization)
            .expect(200);
        const deletedChat = await getByIdChatFixture(chatId);
        await expect(deletedChat).toEqual(null);
    })
});

afterEach( async () => {
    mongoose.connection.close();
    app.close()
});