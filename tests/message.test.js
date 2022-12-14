const request = require('supertest');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require('../app');
const connectDataBase = require("../helpers/connectDataBase");
const {getMessageFixture, getIdMessageFixture, getExistMessageFixture, getByIdMessageFixture, getUpdatedMessageFixture} = require("./fixture/messageFixture");

const { MONGO_CONNECTION_STRING } = dotenv.config().parsed;

jest
    .spyOn(console, 'log')
    .mockImplementation(() => undefined);

beforeEach(async () => {
    await mongoose.disconnect();
    await connectDataBase(MONGO_CONNECTION_STRING)
});

describe('message', () => {
    it('POST', async () => {
        const message = await getMessageFixture();
        const chatId = message.chatId.toString();
        const { body } = await request(app)
            .post(`/api/chat/${chatId}/message`)
            .send(message)
            .expect(201);
        await expect(body.text).toEqual(movie.text);
    })

    it('GET', async () => {
        const message = await getExistMessageFixture();
        const chatId = message.chatId.toString();
        const messageId = message._id;
        const { body } = await request(app)
            .get(`/api/chat/${chatId}/message/${messageId}`)
            .expect(200);
        await expect(body.text).toEqual(message.text);
    })

    it('UPDATE', async () => {
        const message = await getExistMessageFixture();
        const chatId = message.chatId.toString();
        const messageId = message._id;
        const updatedMessage = getUpdatedMessageFixture(message);
        const { body } = await request(app)
            .update(`/api/chat/${chatId}/message/${messageId}`)
            .send(updatedMessage)
            .expect(200);
        await expect(body.text).toEqual(updatedUser.text);
    })

    it('DELETE', async () => {
        const message = await getExistMessageFixture();
        const chatId = message.chatId.toString();
        const messageId = message._id;
        const { body } = await request(app)
            .delete(`/api/chat/${chatId}/message/${messageId}`)
            .expect(200);
        const deletedMessage = await getByIdMessageFixture(messageId);
        await expect(deletedMessage).not.toHaveProperty('_id');
    })
});

afterEach( async () => {
    mongoose.connection.close();
    app.close()
});