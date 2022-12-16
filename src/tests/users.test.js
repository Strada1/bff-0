const request = require('supertest');
const app = require('src/app');
const db = require('src/db');
const { createUser, deleteUser } = require('./fixtures/users');

describe('/users', () => {
  it('get user', async () => {
    const user = await createUser();
    const { body } = await request(app).get(`/users/${user._id}`).expect(200);
    expect(body.username).toEqual(user.username);
    await deleteUser(user._id);
  });

  it('post user', async () => {
    const user = await createUser();
    const { body } = await request(app).post('/users').send(user).expect(201);
    expect(body.username).toEqual(user.username);
    await deleteUser(user._id);
  });

  it('update user', async () => {
    const user = await createUser();
    const newData = { username: 'new test username' };
    const { body } = await request(app)
      .patch(`/users/${user._id}`)
      .send(newData)
      .expect(200);
    expect(body.username).toEqual(newData.username);
    await deleteUser(user._id);
  });

  it('delete user', async () => {
    const user = await createUser();
    await request(app).delete(`/users/${user._id}`).expect(200);
  });

  afterAll((done) => {
    db.connection.close();
    app.close();
    done();
  });
});
