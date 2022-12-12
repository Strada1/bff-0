import request from 'supertest';
import mongoose from 'mongoose';

import { app, serverListener }  from '../server.js';
import {
  dataForNewMovie,
  dataForUpdateMovie,
  getMovieId,
} from './fixtures/movies.js';

import.meta.jest
  .spyOn(console, 'log')
  .mockImplementation(() => undefined);

describe('/movies', () => {

  afterAll(() => {
    mongoose.connection.close();
    serverListener.close();
  });

  it('POST / should create movie and return status 200', async () => {
    const { body } = await request(app)
      .post('/api/movies')
      .send(dataForNewMovie)
      .expect(201);

    expect(body.title).toEqual(dataForNewMovie.title); // проверяем что в ответе отдается созданный фильм
  });

  it('GET / should return movie and status 200', async() => {
    const movieId = getMovieId();

    const { body } = await request(app)
      .get(`/api/movies/${movieId}`)
      .expect(200);

    expect(body._id).toBe(movieId);
  });

  it('GET / should return status 404', async () => {
    const badMovieId = getMovieId(false);

    await request(app)
      .get(`/api/movies/${badMovieId}`)
      .expect(404);
  });

  it('PUT / should return updated movie and status 200', async () => {
    const movieId = getMovieId();

    const { body } = await request(app)
      .put(`/api/movies/${movieId}`)
      .send(dataForUpdateMovie)
      .expect(200);

    expect(body.description).toBe(dataForUpdateMovie.description);
  });
});
