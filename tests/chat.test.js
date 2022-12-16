const request = require('supertest');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require('../app');
const { MONGO_CONNECTION_STRING } = dotenv.config().parsed;
const connectDataBase = require("../helpers/connectDataBase");
const {
    getChatFixture,
    getIdChatFixture,
    getByIdChatFixture,
    getExistChatFixture,
    getUpdatedChatFixture,
} = require("./fixture/chatFixture");


jest
    .spyOn(console, 'log')
    .mockImplementation(() => undefined);

beforeEach(async () => {
    await mongoose.disconnect();
    await connectDataBase(MONGO_CONNECTION_STRING)
});

describe('chat', () => {
    it('POST', async () => {
        const chat = await getChatFixture();
        const { body } = await request(app)
            .post('/api/chats')
            .send(chat)
            .expect(201);
        await expect(body.title).toEqual(chat.title);
    })

    it('GET', async () => {
        const chat = await getExistChatFixture();
        const chatId = chat._id;
        const { body } = await request(app)
            .get(`/api/chats/${chatId}`)
            .expect(200);
        await expect(body.title).toEqual(chat.title);
    })

    it('UPDATE', async () => {
        const chat = await getExistChatFixture();
        const chatId = chat._id;
        const updatedChat = getUpdatedChatFixture(chat);
        const { body } = await request(app)
            .update(`/api/chats/${chatId}`)
            .send(updatedChat)
            .expect(200);
        await expect(body.title).toEqual(updatedChat.title);
    })

    it('DELETE', async () => {
        const chat = await getExistChatFixture();
        const chatId = chat._id;
        const { body } = await request(app)
            .delete(`/api/chats/${chatId}`)
            .expect(200);
        const deletedChat = await getByIdChatFixture(chatId);
        await expect(deletedChat).not.toHaveProperty('_id');
    })
});

afterEach( async () => {
    mongoose.connection.close();
    app.close()
});