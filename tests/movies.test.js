jest.spyOn(console, 'log').mockImplementation(() => '');
const request = require('supertest');
const appListener = require('../src/app');
const db = require('../src/db');
const createTestMovie = require('./fixtures/createTestMovie');
const invalidId = require('./fixtures/invalidId');

describe('/movies', () => {
  let newMovie = null;
  const testTitle = 'Test title';

  it('POST', async () => {
    const movie = createTestMovie();
    const { body } = await request(appListener)
      .post('/movies')
      .send(movie)
      .expect(201);
    expect(body.title).toEqual(movie.title);
    newMovie = body;
  });

  it('GET', async () => {
    const { body } = await request(appListener)
      .get(`/movies/${newMovie._id}`)
      .expect(200);
    expect(body.title).toEqual(newMovie.title);
  });

  it('PUT', async () => {
    const title = testTitle + newMovie._id;
    const { body } = await request(appListener)
      .put(`/movies/${newMovie._id}`)
      .send({ title })
      .expect(200);
    expect(body.title).toEqual(title);
  });

  it('PUT with invalid values (title, year)', async () => {
    const { body } = await request(appListener)
      .put(`/movies/${newMovie._id}`)
      .send(createTestMovie(true))
      .expect(400);
    expect(body.errors[0].param).toEqual('title');
    expect(body.errors[1].param).toEqual('year');
  });

  it('GET with query', async () => {
    const { body } = await request(appListener)
      .get(`/movies?title=${testTitle + newMovie._id}`)
      .expect(200);
    expect(body[0]._id).toEqual(newMovie._id);
  });

  it('DELETE', async () => {
    await request(appListener).delete(`/movies/${newMovie._id}`).expect(200);
  });

  it('DELETE unknown', async () => {
    await request(appListener)
      .delete(`/movies/${invalidId}`)
      .expect(404);
  });

  it('GET unknown', async () => {
    await request(appListener).get(`/movies/${invalidId}`).expect(404);
  });

  it('PUT unknown', async () => {
    const title = testTitle + newMovie._id;
    await request(appListener)
      .put(`/movies/${invalidId}`)
      .send({ title })
      .expect(404);
  });

  it('POST with invalid title and date', async () => {
    const { body } = await request(appListener)
      .post('/movies')
      .send(createTestMovie(true))
      .expect(400);
    expect(body.errors[0].param).toEqual('title');
    expect(body.errors[1].param).toEqual('year');
  });

  afterAll((done) => {
    db.connection.close();
    appListener.close();
    done();
  });
});
