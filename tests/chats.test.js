require('dotenv').config();
const request = require('supertest');
const appListener = require('../src/app');
const db = require('../src/db');
const Chat = require('../src/models/Chat');
const User = require('../src/models/User');
const createChat = require('./fixtures/createChat');
const createUser = require('./fixtures/createUser');
const getAuthorizationData = require('./fixtures/getAuthorizationData');
const {
  dropUsersCollection,
  dropChatsCollection,
} = require('./fixtures/dropCollections');

beforeAll(async () => {
  await dropUsersCollection();
  await dropChatsCollection();
});

afterAll(async () => {
  appListener.close();
  db.connection.close();
});

const apiPath = '/api/chats';

describe('/api/chats', () => {
  const title = 'testChat';

  it('POST', async () => {
    const firstUser = await createUser();
    const secondUser = await createUser();
    const auth = getAuthorizationData(firstUser.token);

    const { body } = await request(appListener)
      .post(apiPath)
      .send({ title, users: [secondUser._id] })
      .set(auth.key, auth.value)
      .expect(201);

    expect(body.users).toContainEqual(firstUser._id.toString());
    expect(body.users).toContainEqual(secondUser._id.toString());
    expect(body.title).toBe(title);
    expect(body.owner).toBe(firstUser._id.toString());

    await User.findByIdAndDelete(firstUser._id);
    await User.findByIdAndDelete(secondUser._id);
    await Chat.findByIdAndDelete(body._id);
  });

  it('DELETE /:id', async () => {
    const user = await createUser();
    const auth = getAuthorizationData(user.token);
    const chat = await createChat(user._id);

    await request(appListener)
      .delete(apiPath + `/${chat._id}`)
      .set(auth.key, auth.value)
      .expect(200);

    const find = await Chat.findById(chat._id);
    expect(find).toBeFalsy();

    await User.findByIdAndDelete(user._id);
  });

  it('PUT /:id', async () => {
    const title = 'updated title';
    const user = await createUser();
    const auth = getAuthorizationData(user.token);
    const chat = await createChat(user._id);

    const { body } = await request(appListener)
      .put(apiPath + `/${chat._id}`)
      .send({ title })
      .set(auth.key, auth.value)
      .expect(200);

    expect(body._id).toBe(chat._id);
    expect(body.title).toBe(title);

    await User.findByIdAndDelete(user._id);
    await Chat.findByIdAndDelete(chat._id);
  });

  it('GET', async () => {
    const admin = await createUser(true);
    const auth = getAuthorizationData(admin.token);
    const firstChat = await createChat(admin._id);
    const secondChat = await createChat(admin._id);

    const { body } = await request(appListener)
      .get(apiPath)
      .set(auth.key, auth.value)
      .expect(200);

    expect(Array.isArray(body)).toBe(true);
    expect(body.length >= 2).toBe(true);
    expect(body.map((chat) => chat._id)).toContainEqual(firstChat._id);
    expect(body.map((chat) => chat._id)).toContainEqual(secondChat._id);

    await User.findByIdAndDelete(admin._id);
    await Chat.findByIdAndDelete(firstChat._id);
    await Chat.findByIdAndDelete(secondChat._id);
  });

  it('GET /:id', async () => {
    const user = await createUser();
    const auth = getAuthorizationData(user.token);
    const chat = await createChat(user._id);

    const { body } = await request(appListener)
      .get(apiPath + `/${chat._id}`)
      .set(auth.key, auth.value)
      .expect(200);

    expect(body._id).toBe(chat._id);
    expect(body.title).toBe(chat.title);

    await User.findByIdAndDelete(user._id);
    await Chat.findByIdAndDelete(chat._id);
  });
});

describe('/api/chats/:id/users', () => {
  it('POST', async () => {
    const firstUser = await createUser();
    const secondUser = await createUser();
    const thirdUser = await createUser();
    const auth = getAuthorizationData(firstUser.token);
    const chat = await createChat(firstUser._id);

    const { body } = await request(appListener)
      .post(apiPath + `/${chat._id}/users`)
      .send({ users: [secondUser._id, thirdUser._id] })
      .set(auth.key, auth.value)
      .expect(200);

    expect(body.users).toContainEqual(secondUser._id);
    expect(body.users).toContainEqual(thirdUser._id);

    await User.findByIdAndDelete(firstUser._id);
    await User.findByIdAndDelete(secondUser._id);
    await User.findByIdAndDelete(thirdUser._id);
    await Chat.findByIdAndDelete(chat._id);
  });

  it('DELETE', async () => {
    const firstUser = await createUser();
    const secondUser = await createUser();
    const auth = getAuthorizationData(firstUser.token);
    const chat = await createChat(firstUser._id);

    await Chat.findByIdAndUpdate(chat._id, {
      $push: { users: secondUser._id },
    });

    const { body } = await request(appListener)
      .delete(apiPath + `/${chat._id}/users`)
      .send({ users: [secondUser._id] })
      .set(auth.key, auth.value)
      .expect(200);

    expect(body.users).not.toContainEqual(secondUser._id);
    expect(body.users.length).toBe(1);

    await User.findByIdAndDelete(firstUser._id);
    await User.findByIdAndDelete(secondUser._id);
    await Chat.findByIdAndDelete(chat._id);
  });
});
