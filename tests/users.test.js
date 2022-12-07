jest.spyOn(console, 'log').mockImplementation(() => '');
const request = require('supertest');
const appListener = require('../src/app');
const db = require('../src/db');
const {
  getAuthorizationData,
  adminAuthorizationData,
} = require('./fixtures/authorizationData');
const createTestFavorite = require('./fixtures/createTestFavorite');
const createTestUser = require('./fixtures/createTestUser');

describe('/users', () => {
  let testUser = createTestUser();
  let auth = null;

  it('POST', async () => {
    await request(appListener).post('/users').send(testUser).expect(201);
  });

  it('user can auth and get user info with token', async () => {
    const { body } = await request(appListener)
      .post('/users/auth')
      .send(testUser)
      .expect(200);
    expect(body.email).toEqual(testUser.email);
    expect(body.token).toBeTruthy();
    expect(body._id).toBeTruthy();
    testUser.token = body.token;
    testUser._id = body._id;
    auth = getAuthorizationData(testUser.token);
  });

  it('GET /me - user should have favorites', async () => {
    const { body } = await request(appListener)
      .get('/users/me')
      .set(auth.key, auth.data)
      .expect(200);
    expect(body.favorites).toBeTruthy();
  });

  it('POST /me/favorites - should fail with 401 no auth', async () => {
    await request(appListener)
      .post('/users/me/favorites')
      .send(createTestFavorite())
      .expect(401);
  });

  it('POST /me/favorites - should fail with 400 when invalid value', async () => {
    await request(appListener)
      .post('/users/me/favorites')
      .set(auth.key, auth.data)
      .send(createTestFavorite(true))
      .expect(400);
  });

  it('POST /me/favorites - should add favorite', async () => {
    const testFavorite = createTestFavorite();
    const { body } = await request(appListener)
      .post('/users/me/favorites')
      .set(auth.key, auth.data)
      .send(testFavorite)
      .expect(200);
    expect(body.favorites).toContain(testFavorite.movie);
  });

  it('DELETE /me/favorites - should fail with 401 no auth', async () => {
    await request(appListener)
      .delete('/users/me/favorites')
      .send(createTestFavorite())
      .expect(401);
  });

  it('DELETE /me/favorites - should fail with 400 when invalid value', async () => {
    await request(appListener)
      .delete('/users/me/favorites')
      .set(auth.key, auth.data)
      .send(createTestFavorite(true))
      .expect(400);
  });

  it('GET /favorites/count', async () => {
    const req = await request(appListener)
      .get('/users/favorites/count')
      .set(adminAuthorizationData.key, adminAuthorizationData.data)
      .expect(200);
    expect(Object.values(req.body)[0]).toBeGreaterThan(0);
  });

  it('DELETE /me/favorites - should delete favorite', async () => {
    const testFavorite = createTestFavorite();
    const { body } = await request(appListener)
      .delete('/users/me/favorites')
      .set(auth.key, auth.data)
      .send(testFavorite)
      .expect(200);
    expect(body.favorites).not.toContain(testFavorite.movie);
  });

  it('GET /favorites/count should fail if not admin', async () => {
    await request(appListener)
      .get('/users/favorites/count')
      .set(auth.key, auth.data)
      .expect(401);
  });

  it('DELETE', async () => {
    await request(appListener)
      .delete('/users/' + testUser._id)
      .set(adminAuthorizationData.key, adminAuthorizationData.data)
      .expect(200);
  });

  afterAll((done) => {
    db.connection.close();
    appListener.close();
    done();
  });
});
