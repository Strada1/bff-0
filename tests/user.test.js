const request = require('supertest');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require('../app');
const connectDataBase = require("../helpers/connectDataBase");
const {getUserFixture, getIdUserFixture, getByIdUserFixture, getExistUserFixture, getUpdatedUserFixture} = require("./fixture/userFixture");

const { MONGO_CONNECTION_STRING } = dotenv.config().parsed;

jest
    .spyOn(console, 'log')
    .mockImplementation(() => undefined);

beforeEach(async () => {
    await mongoose.disconnect();
    await connectDataBase(MONGO_CONNECTION_STRING)
});

describe('user', () => {
    it('POST', async () => {
        const user = await getUserFixture();
        const { body } = await request(app)
            .post('/api/users')
            .send(user)
            .expect(201);
        await expect(body.username).toEqual(movie.username);
    })

    it('GET', async () => {
        const userId = await getIdUserFixture();
        const { body } = await request(app)
            .get(`/api/users/${userId}`)
            .expect(200);
        const user = await getByIdUserFixture(userId);
        await expect(body.username).toEqual(user.username);
    })

    it('UPDATE', async () => {
        const user = await getExistUserFixture();
        const userId = user._id;
        const updatedUser = getUpdatedUserFixture(user);
        const { body } = await request(app)
            .update(`/api/users/${userId}`)
            .send(updatedUser)
            .expect(200);
        await expect(body.email).toEqual(updatedUser.email);
        await expect(body.username).toEqual(updatedUser.username);
    })

    it('DELETE', async () => {
        const user = await getExistUserFixture();
        const userId = user._id;
        const { body } = await request(app)
            .delete(`/api/users/${userId}`)
            .expect(200);
        const deletedUser = await getByIdUserFixture(userId);
        await expect(deletedUser).not.toHaveProperty('_id');
    })
});

afterEach( async () => {
    mongoose.connection.close();
    app.close()
});