require('dotenv').config();
const request = require('supertest');
const appListener = require('../src/app');
const db = require('../src/db');
const Chat = require('../src/models/Chat');
const Message = require('../src/models/Message');
const User = require('../src/models/User');
const createChat = require('./fixtures/createChat');
const createMessage = require('./fixtures/createMessage');
const createUser = require('./fixtures/createUser');
const getAuthorizationData = require('./fixtures/getAuthorizationData');

async function dropUsersCollection() {
  await User.deleteMany({});
}

async function dropChatsCollection() {
  await Chat.deleteMany({});
}

async function dropMessagesCollection() {
  await Message.deleteMany({});
}

beforeAll(async () => {
  await dropUsersCollection();
  await dropChatsCollection();
  await dropMessagesCollection();
});

afterAll(async () => {
  appListener.close();
  db.connection.close();
});

describe('/api/messages', () => {
  const text = 'test message';
  const apiPath = '/api/messages';

  it('POST', async () => {
    const user = await createUser();
    const auth = getAuthorizationData(user.token);
    const chat = await createChat(user._id);

    const { body } = await request(appListener)
      .post(apiPath)
      .send({ text, chat: chat._id })
      .set(auth.key, auth.value)
      .expect(201);

    expect(body.user).toBe(user._id);
    expect(body.chat).toBe(chat._id);
    expect(body.text).toBe(text);

    await User.findByIdAndDelete(user._id);
    await Chat.findByIdAndDelete(chat._id);
    await Message.findByIdAndDelete(body._id);
  });

  it('DELETE /:id', async () => {
    const user = await createUser();
    const auth = getAuthorizationData(user.token);
    const chat = await createChat(user._id);
    const message = await createMessage(user._id, chat._id, text);

    await request(appListener)
      .delete(apiPath + `/${message._id}`)
      .set(auth.key, auth.value)
      .expect(200);

    const find = await Message.findById(message._id);
    expect(find).toBeFalsy();

    await User.findByIdAndDelete(user._id);
    await Chat.findByIdAndDelete(chat._id);
  });

  it('PUT /:id', async () => {
    const updatedText = 'updated';
    const user = await createUser();
    const auth = getAuthorizationData(user.token);
    const chat = await createChat(user._id);
    const message = await createMessage(user._id, chat._id, text);

    const { body } = await request(appListener)
      .put(apiPath + `/${message._id}`)
      .send({ text: updatedText })
      .set(auth.key, auth.value)
      .expect(204);

    expect(body._id).toBe(message._id);
    expect(body.text).toBe(updatedText);

    await User.findByIdAndDelete(user._id);
    await Chat.findByIdAndDelete(chat._id);
    await Message.findByIdAndDelete(message._id);
  });

  it('GET ?chat=chatId', async () => {
    const user = await createUser();
    const auth = getAuthorizationData(user.token);
    const chat = await createChat(user._id);
    const firstMessage = await createMessage(user._id, chat._id, text);
    const secondMessage = await createMessage(user._id, chat._id, text + 2);

    const { body } = await request(appListener)
      .get(apiPath + `?chat=${chat._id}`)
      .set(auth.key, auth.value)
      .expect(200);

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(2);
    expect(body.map((message) => message._id)).toContainEqual(firstMessage._id);
    expect(body.map((message) => message._id)).toContainEqual(
      secondMessage._id
    );

    await User.findByIdAndDelete(user._id);
    await Chat.findByIdAndDelete(chat._id);
    await Message.findByIdAndDelete(firstMessage._id);
    await Message.findByIdAndDelete(secondMessage._id);
  });
});
