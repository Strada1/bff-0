jest.spyOn(console, 'log').mockImplementation(() => null);

const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');
const { adminAuthData, clientAuthData } = require('./fixtures/auth');
const { user } = require('./fixtures/user');

describe('/user', () => {
  it('GET /favorites_count', async () => {
    const req = await request(app)
      .get('/favorites_count')
      .set(adminAuthData.key, adminAuthData.data)
      .expect(200);
    expect(Object.values(req.body)[0]).toBeGreaterThan(0);
  });
  it('POST user', async () => {
    const { body } = await request(app)
      .post('/user')
      .set(clientAuthData.key, clientAuthData.data)
      .send(user)
      .expect(201);
    expect(body.email).toEqual(user.email);
  });
  it('auth user', async () => {
    const { text } = await request(app)
      .post('/auth')
      .send(user)
      .expect(201);
    expect(text).toEqual(user.token);
  });

  afterAll((done) => {
    db.connection.close();
    app.close();
    done();
  });
});
