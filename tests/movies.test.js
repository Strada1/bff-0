const request = require('supertest');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require('../app');
const connectDataBase = require("../helpers/connectDataBase");
const {getMovie} = require("./fixtures/moviesFixture");
const {getUserFixture} = require("./fixtures/userFixture");
const {getDirector} = require("./fixtures/directorFixture");

const { MONGO_CONNECTION_STRING } = dotenv.config().parsed;

jest
    .spyOn(console, 'log')
    .mockImplementation(() => undefined);

beforeEach(async () => {
    await mongoose.disconnect();
    await connectDataBase(MONGO_CONNECTION_STRING)
});

describe('movies', () => {
    it('POST', async () => {
        const movie = await getMovie();
        const { body } = await request(app)
            .post('/api/movies')
            .send(movie)
            .expect(201);
        await expect(body.title).toEqual(movie.title);
    })

    it('POST', async () => {
        const movie = await getMovie({errors: { year: true }});
        const { body } = await request(app)
            .post('/api/movies')
            .send(movie)
            .expect(400);
        await expect(body.errors[0].param).toEqual('year')
    })
});

describe('users', () => {
    it('POST пользователь уже существует', async () => {
        const user = await getUserFixture({exists: true});
        const { body } = await request(app)
            .post('/api/users')
            .send(user)
            .expect(409);
    })

    it('GET пользователь не существует', async () => {
        const userId = '6378b3244baef0bbefd65c79';
        const { body } = await request(app)
            .get(`/api/users/${userId}`)
            .expect(404);
    })
});

describe('directors', () => {
    it('DEL ', async () => {
        const directorId = '6378b3244baef0bbefd65c79';
        const { body } = await request(app)
            .delete(`/api/directors/${directorId}`)
            .expect(200);
    })

    it('PUT', async () => {
        const directorId = '6378b3244baef0bbefd65c79';
        const director = await getDirector();
        const { body } = await request(app)
            .put(`/api/directors/${directorId}`)
            .send(director)
            .expect(200);
    })
});

afterEach( async () => {
    mongoose.connection.close();
    app.close()
});