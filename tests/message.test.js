const request = require('supertest');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require('../app');
const connectDataBase = require("../helpers/connectDataBase");
const {getMessageFixture} = require("./fixture/messageFixture");
const getAuthorization = require("./helpers/getAuthorization");
const {getExistChatFixture} = require("./fixture/chatFixture");
const {dropChatsCollection, dropMessagesCollection, dropUsersCollection} = require("./helpers/dropCollections");

const { MONGO_CONNECTION_STRING } = dotenv.config().parsed;

jest
    .spyOn(console, 'log')
    .mockImplementation(() => undefined);

beforeEach(async () => {
    await connectDataBase(MONGO_CONNECTION_STRING)

    await dropChatsCollection();
    await dropMessagesCollection();
    await dropUsersCollection();
});

describe('message', () => {
    it('POST', async () => {
        const authorization = await getAuthorization();
        const message = await getMessageFixture();
        const chatId = message.chatId.toString();
        const { body } = await request(app)
            .post(`/api/chat/${chatId}/message`)
            .set(authorization)
            .send(message)
            .expect(201);
        await expect(body.text).toEqual(message.text);
    })

    it('GET', async () => {
        const authorization = await getAuthorization();
        const chat = await getExistChatFixture();
        const chatId = chat._id.toString()
        const { body } = await request(app)
            .get(`/api/chat/${chatId}/message`)
            .set(authorization)
            .expect(200);
        const isEmpty = body.length === 0;
        if (!isEmpty) {
            const [message] = body;
            await expect(message).toHaveProperty('userId');
            await expect(message).toHaveProperty('text');
            await expect(message).toHaveProperty('chatId');
            await expect(message).toHaveProperty('createdAt');
        }
    })
});

afterEach( async () => {
    mongoose.connection.close();
    app.close()
});