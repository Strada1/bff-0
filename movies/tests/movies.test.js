jest.spyOn(console, 'log').mockImplementation(() => null);

const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');
const { adminAuthData, clientAuthData } = require('./fixtures/auth');
const { invalidMovie, movie } = require('./fixtures/movie');

describe('/movies', () => {
  it('POST movie', async () => {
    const { body } = await request(app)
      .post('/movies')
      .set(adminAuthData.key, adminAuthData.data)
      .send(movie)
      .expect(201);
    expect(body.title).toEqual(movie.title);
  });
  it('POST movie (fail validation)', async () => {
    await request(app)
      .post('/movies')
      .set(adminAuthData.key, adminAuthData.data)
      .send(invalidMovie)
      .expect(400);
  });
  it('GET movies with year 2022', async () => {
    const { body } = await request(app)
      .get('/movies?year=2022')
      .set(clientAuthData.key, clientAuthData.data)
      .expect(200);
    expect(body[0].year).toEqual(2022);
  });
  it('GET movie', async () => {
    const { body } = await request(app)
      .get('/movies/637f6e1b3f9df438aa20abbd')
      .set(clientAuthData.key, clientAuthData.data)
      .expect(200);
    expect(body.description).toEqual('movie title');
  });
  it('DELETE movie (Unauthorized)', async () => {
    await request(app)
      .delete('/movies/638ded4f785a55e8ccf99b61')
      .expect(401);
  });
  it('DELETE movie (not enough rights)', async () => {
    await request(app)
      .delete('/movies/638ded4f785a55e8ccf99b61')
      .set(clientAuthData.key, clientAuthData.data)
      .expect(403);
  });
  it('PATCH movie', async () => {
    const { body } = await request(app)
      .patch('/movies/637f6e1b3f9df438aa20abb9')
      .set(adminAuthData.key, adminAuthData.data)
      .send({ title: 'update test' })
      .expect(200);
    expect(body.title).toEqual('update test');
  });
  // it('add movie to favorites', async () => {
  //   await request(app)
  //     .patch('/movies/637e0d3b36cc2afb43f942fb/add_to_favorites')
  //     .set(clientAuthData.key, clientAuthData.data)
  //     .expect(204);
  // });

  afterAll((done) => {
    db.connection.close();
    app.close();
    done();
  });
});
