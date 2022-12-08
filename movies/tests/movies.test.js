jest.spyOn(console, 'log').mockImplementation(() => null);

const request = require('supertest');
const app = require('../src/app');

describe('/movies', () => {
  it('POST movie (fail validation)', async () => {
    const movie = {
      'year': 1994,
      'description': 'movie descr'
    };
    const { text } = await request(app)
      .post('/movies')
      .send(movie)
      .expect(400);
    expect(text).toEqual('Validation is failed, missing required fields: title');
  });
  it('GET movies with year 2022', async () => {
    const { body } = await request(app)
      .get('/movies?year=2022')
      .expect(200);
    expect(body[0].year).toEqual(2022);
  });
  it('add movie to favorites', async () => {
    await request(app)
      .patch('/movies/:id/add_to_favorites')
      .expect(204);
  });
});

describe('/movies/:movieId', () => {
  it('GET movie', async () => {
    const { body } = await request(app)
      .get('/movies/637f6e1b3f9df438aa20abbd')
      .expect(200);
    expect(body.description).toEqual('movie title');
  });
  it('DELETE movie (Unauthorized)', async () => {
    await request(app)
      .delete('/movies/638ded4f785a55e8ccf99b61')
      .expect(401);
  });
  it('PATCH movie', async () => {
    const { body } = await request(app)
      .patch('/movies/637f6e1b3f9df438aa20abb9')
      .send({ title: 'update test' })
      .expect(200);
    expect(body.title).toEqual('update test');
  });
});