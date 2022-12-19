const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');
const { createChat, deleteChat } = require('./fixtures/chats');
const { createUser, deleteUser } = require('./fixtures/users');
const { createAuthData } = require('./fixtures/auth');
jest.spyOn(console, 'log').mockImplementation(() => null);

afterAll(async () => {
  app.close();
  db.connection.close();
});

describe('/chats', () => {
  it('get chats', async () => {
    const admin = await createUser(true);
    const adminAuthData = createAuthData(admin.token);
    await request(app)
      .get('/chats/')
      .set(adminAuthData.key, adminAuthData.value)
      .expect(200);
    await deleteUser(admin._id);
  });
  
  it('get chat', async () => {
    const user = await createUser();
    const memberAuthData = createAuthData(user.token);
    const chat = await createChat();
    const { body } = await request(app)
      .get(`/chats/${chat._id}`)
      .set(memberAuthData.key, memberAuthData.value)
      .expect(200);
    expect(body.title).toEqual(chat.title);
    await deleteUser(user._id);
    await deleteChat(chat._id);
  });

  it('post chat', async () => {
    const user = await createUser();
    const memberAuthData = createAuthData(user.token);
    const chat = { title: 'test post', users: [] };
    const { body } = await request(app)
      .post('/chats')
      .set(memberAuthData.key, memberAuthData.value)
      .send(chat)
      .expect(201);
    expect(body.title).toEqual(chat.title);
    expect(body.owner === user._id);
    await deleteUser(user._id);
    await deleteChat(body._id);
  });

  it('update chat', async () => {
    const admin = await createUser(true);
    const adminAuthData = createAuthData(admin.token);
    const chat = await createChat();
    const newData = { title: 'new test title' };
    const { body } = await request(app)
      .patch(`/chats/${chat._id}`)
      .set(adminAuthData.key, adminAuthData.value)
      .send(newData)
      .expect(200);
    expect(body.title).toEqual(newData.title);
    await deleteUser(admin._id);
    await deleteChat(chat._id);
  });

  it('delete chat', async () => {
    const admin = await createUser(true);
    const adminAuthData = createAuthData(admin.token);
    const chat = await createChat();
    await request(app)
      .delete(`/chats/${chat._id}`)
      .set(adminAuthData.key, adminAuthData.value)
      .expect(200);
    await deleteUser(admin._id);
  });
});
