const request = require('supertest');
const app = require('src/app');
const db = require('src/db');
const { createChat, deleteChat } = require('./fixtures/chats');

describe('/chats', () => {
  it('get chat', async () => {
    const chat = await createChat();
    const { body } = await request(app)
      .get(`/chats/${chat._id}`)
      .expect(200);
    expect(body.title).toEqual(chat.title);
    await deleteChat(chat._id);
  });

  it('post chat', async () => {
    const chat = await createChat();
    const { body } = await request(app)
      .post('/chats')
      .send(chat)
      .expect(201);
    expect(body.title).toEqual(chat.title);
    await deleteChat(chat._id);
  });

  it('update chat', async () => {
    const chat = await createChat();
    const newData = { title: 'new test title' };
    const { body } = await request(app)
      .patch(`/chats/${chat._id}`)
      .send(newData)
      .expect(200);
    expect(body.title).toEqual(newData.title);
    await deleteChat(chat._id);
  });

  it('delete chat', async () => {
    const chat = await createChat();
    await request(app)
      .delete(`/chats/${chat._id}`)
      .expect(200);
  });

  afterAll((done) => {
    db.connection.close();
    app.close();
    done();
  });
});
