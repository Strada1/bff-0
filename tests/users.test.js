const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');
const { createUser, deleteUser, memberData } = require('./fixtures/users');
const { createAuthData } = require('./fixtures/auth');
jest.spyOn(console, 'log').mockImplementation(() => null);

afterAll(async () => {
  app.close();
  db.connection.close();
});

describe('/users', () => {
  it('get user', async () => {
    const user = await createUser();
    const memberAuthData = createAuthData(user.token);
    const { body } = await request(app)
      .get(`/users/${user._id}`)
      .set(memberAuthData.key, memberAuthData.value)
      .expect(200);
    expect(body.username).toEqual(user.username);
    await deleteUser(user._id);
  });

  it('post user', async () => {
    const { body } = await request(app)
      .post('/users')
      .send(memberData)
      .expect(201);
    expect(body.username).toEqual(memberData.username);
    await deleteUser(body._id);
  });

  it('update user', async () => {
    const admin = await createUser(true);
    const adminAuthData = createAuthData(admin.token);
    const newData = { username: 'new test username' };
    const { body } = await request(app)
      .patch(`/users/${admin._id}`)
      .set(adminAuthData.key, adminAuthData.value)
      .send(newData)
      .expect(200);
    expect(body.username).toEqual(newData.username);
    await deleteUser(admin._id);
  });

  it('delete user', async () => {
    const admin = await createUser(true);
    const adminAuthData = createAuthData(admin.token);
    await request(app)
      .delete(`/users/${admin._id}`)
      .set(adminAuthData.key, adminAuthData.value)
      .expect(200);
  });
});
