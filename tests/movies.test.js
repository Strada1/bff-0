const request = require('supertest');
const app = require('../app');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDataBase = require("../helpers/connectDataBase");

const { MONGO_CONNECTION_STRING } = dotenv.config().parsed;

beforeEach(async () => {
    await mongoose.disconnect();
    await connectDataBase(MONGO_CONNECTION_STRING)
});

describe('movies', () => {
    it('POST', async () => {
        const movie = {
            'title': 'The Shawshank Redemption',
            'year': 1994,
            'rating': 9.2,
            'description': 'The Shawshank Redemption',
            "director": "6378b3244baef0bbefd65c79",
            "category": "6378b31b4baef0bbefd65c76"
        }
        const { body } = await request(app)
            .post('/api/movies')
            .send(movie)
            .expect(201);
        await expect(body.title).toEqual(movie.title);
    })

    it('POST', async () => {
        const movie = {
            'title': 'The Shawshank Redemption',
            'year': '3e',
            'rating': 9.2,
            'description': 'The Shawshank Redemption',
            "director": "6378b3244baef0bbefd65c79",
            "category": "6378b31b4baef0bbefd65c76"
        }
        const { body } = await request(app)
            .post('/api/movies')
            .send(movie)
            .expect(400);
        await expect(body.errors[0].param).toEqual('year')
    })
});

describe('users', () => {
    it('POST пользователь уже существует', async () => {
        const user = {
            "email": "test@test.ru",
            "username": "tester",
            "password": "zaqxsw123"
        }
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
        const director = {
            "name": "name",
            "firstname": "firstname"
        }
        const { body } = await request(app)
            .put(`/api/directors/${directorId}`)
            .send(director)
            .expect(200);
        console.log(body)
    })
});

afterEach( async () => {
    mongoose.connection.close();
    app.close()
});