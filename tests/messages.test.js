const request = require('supertest');
const app = require('../src/app');
const db = require('../src/db');
const { createMessage, deleteMessage } = require('./fixtures/messages');
const passport = require('passport');
const MockStrategy = require('passport-mock-strategy');
const { createUser, deleteUser } = require('./fixtures/users');
const { createAuthData } = require('./fixtures/auth');
const { createChat, deleteChat } = require('./fixtures/chats');
passport.use('bearer', new MockStrategy());
jest.spyOn(console, 'log').mockImplementation(() => null);

describe('/messages', () => {
  it('get message', async () => {
    const message = await createMessage();
    const { body } = await request(app)
      .get(`/messages/${message._id}`)
      .expect(200);
    expect(body.text).toEqual(message.text);
    await deleteMessage(message._id);
  });

  it('post message', async () => {
    const user = await createUser();
    const memberAuthData = createAuthData(user.token);
    const chat = await createChat([ user._id ]);
    const message = {
      user: user._id,
      text: 'test message',
      chatId: chat._id
    };
    const { body } = await request(app)
      .post('/messages')
      .set(memberAuthData.key, memberAuthData.value)
      .send(message)
      .expect(201);
    expect(body.text).toEqual(message.text);
    await deleteUser(user._id);
    await deleteChat(chat._id);
    await deleteMessage(body._id);
  });

  it('update message', async () => {
    const user = await createUser();
    const memberAuthData = createAuthData(user.token);
    const message = await createMessage(user._id);
    const newData = { text: 'new test messagetext' };
    const { body } = await request(app)
      .patch(`/messages/${message._id}`)
      .set(memberAuthData.key, memberAuthData.value)
      .send(newData)
      .expect(200);
    expect(body.text).toEqual(newData.text);
    await deleteUser(user._id);
    await deleteMessage(message._id);
  });

  it('delete message', async () => {
    const user = await createUser();
    const memberAuthData = createAuthData(user.token);
    const message = await createMessage(user._id);
    await request(app)
      .delete(`/messages/${message._id}`)
      .set(memberAuthData.key, memberAuthData.value)
      .expect(200);
    await deleteUser(user._id);
  });

  afterAll((done) => {
    db.connection.close();
    app.close();
    done();
  });
});
