import request from 'supertest';
import mongoose from 'mongoose';

import { app, serverListener }  from '../server.js';
import {
  dataForNewUser,
  alreadyUsedDataForUser,
  getUserId,
  adminToken,
} from './fixtures/users.js';
import { getMovieId } from './fixtures/movies.js';

import.meta.jest.spyOn(console, 'log').mockImplementation(() => undefined);

describe('/users', () => {

  afterAll(() => {
    mongoose.connection.close();
    serverListener.close();
  });

  it('POST / should register user and return status 201', async () => {
    const { body } = await request(app)
      .post('/api/users/registration')
      .send(dataForNewUser)
      .expect(201);

    expect(body.email).toBe(dataForNewUser.email);
  });

  it('POST / should return status 404 if email or username already exists', async () => {
    await request(app)
      .post('/api/users/registration')
      .send(alreadyUsedDataForUser)
      .expect(400);
  });

  describe('favorites', () => {
    describe('POST', () => {
      it('should add favorite movie in user favorites and return status 201', async () => {
        const { body } = await request(app)
          .post(`/api/users/${getUserId()}/favorites?movieId=${getMovieId()}`)
          .expect(201);

        expect(body.favorites).toContain(getMovieId());
      });

      it('should return status 404 if user by userId not found',async () => {
        await request(app)
          .post(`/api/users/${getUserId(false)}/favorites?movieId=${getMovieId()}`)
          .expect(404);
      });

      it('should return status 404 if movie by movieId not found ',async () => {
        await request(app)
          .post(`/api/users/${getUserId()}/favorites?movieId=${getMovieId(false)}`)
          .expect(404);
      });
    });

    describe('DELETE', () => {
      it('should delete movie from user favorites and return status 200', async () => {
        const { body } = await request(app)
          .delete(`/api/users/${getUserId()}/favorites?movieId=${getMovieId()}`)
          .expect(200);

        expect(body.favorites).not.toContain(getMovieId());
      });

      it('should return status 404 if user by userId not found', async () => {
        await request(app)
          .delete(`/api/users/${getUserId(false)}/favorites?movieId=${getMovieId()}`)
          .expect(404);
      });
    });

    describe('aggregation', () => {
      it('should return object with count favorite movies users', async () => {
        const { body } = await request(app)
          .get('/api/users/favorites/aggregation/countFavoritesFromAllUsers')
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200);

        expect(body['Сияние']).toBeDefined();
      });
    });
  });

});