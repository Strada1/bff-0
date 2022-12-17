const request = require('supertest');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Passport = require("../middlewares/passport");

const app = require('../app');
const connectDataBase = require("../helpers/connectDataBase");
const {getUserFixture, getIdUserFixture, getByIdUserFixture, getExistUserFixture, getUpdatedUserFixture,
    getTokenUserFixture
} = require("./fixture/userFixture");
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

describe('user', () => {
    it('POST', async () => {
        const user = await getUserFixture();
        const { body } = await request(app)
            .post('/api/users')
            .send(user)
            .expect(201);
        await expect(body.username).toEqual(user.username);
    })

    it('GET', async () => {
        const userId = await getIdUserFixture();
        const token = await getTokenUserFixture();
        const { body } = await request(app)
            .get(`/api/users/${userId}`)
            .set({'Authorization' : `Bearer ${token}`})
            .expect(200);
        const user = await getByIdUserFixture(userId);
        await expect(body.username).toEqual(user.username);
    })

    it('UPDATE', async () => {
        const user = await getExistUserFixture();
        const userId = user._id;
        const token = user.token;
        const updatedUser = getUpdatedUserFixture(user);
        const { body } = await request(app)
            .put(`/api/users/${userId}`)
            .set({'Authorization' : `Bearer ${token}`})
            .send(updatedUser)
            .expect(200);
        await expect(body.value.username).toEqual(updatedUser.username);
    })

    it('DELETE', async () => {
        const user = await getExistUserFixture();
        const userId = user._id;
        const token = user.token;
        const { body } = await request(app)
            .delete(`/api/users/${userId}`)
            .set({'Authorization' : `Bearer ${token}`})
            .expect(200);
        const deletedUser = await getByIdUserFixture(userId);
        await expect(deletedUser).toEqual(null);
    })
});

afterEach( async () => {
    mongoose.connection.close();
    app.close()
});