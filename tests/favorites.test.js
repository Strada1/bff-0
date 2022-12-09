const request = require('supertest');
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = require('../app');
const connectDataBase = require("../helpers/connectDataBase");
const {getMovie} = require("./fixtures/moviesFixture");
const {getUserFixture, getUserFavoriteFixture} = require("./fixtures/userFixture");

const { MONGO_CONNECTION_STRING } = dotenv.config().parsed;

jest
    .spyOn(console, 'log')
    .mockImplementation(() => undefined);

beforeEach(async () => {
    await mongoose.disconnect();
    await connectDataBase(MONGO_CONNECTION_STRING)
});

describe('favorites', () => {
    it('PUT add movie to favorites', async () => {
        const userId = (await getUserFixture({exists: true}))._id.toString();
        const movie = await getMovie({exists: true});
        const movieId = movie._id.toString();
        await request(app)
            .put(`/api/users/${userId}/favorites/${movieId}`)
            .expect(200);
    })

    it('PUT add movie to favorites', async () => {
        const userId = (await getUserFixture({exists: true}))._id.toString();
        const movieId = (await getUserFavoriteFixture({userId})).toString();
        await request(app)
            .put(`/api/users/${userId}/favorites/${movieId}`)
            .expect(409);
    })

    it('DEL movie from favorites', async () => {
        const userId = (await getUserFixture({exists: true}))._id.toString();
        const movieId = (await getUserFavoriteFixture({userId})).toString();
        await request(app)
            .delete(`/api/users/${userId}/favorites/${movieId}`)
            .expect(200);
    })

    it('GET calculate movie from favorites', async () => {
        // считает кол-во фильмов в избранном у всех пользователей
        // и группирует их по title фильма (объект вида [title]: count)
        const { body } = await request(app)
            .get('/api/info/statistic/favorites')
            .expect(200);
        const hasElements = body.length > 0;
        if (hasElements) {
            await expect(body[0].count).not.toEqual(undefined)
            await expect(body[0].title).not.toEqual(undefined)
        }
    })

});

afterEach( async () => {
    await mongoose.connection.close();
    app.close()
});