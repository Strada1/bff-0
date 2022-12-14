require('dotenv').config();
const request = require('supertest');
const appListener = require('../src/app');
const db = require('../src/db');
const Chat = require('../src/models/Chat');
const User = require('../src/models/User');
const createChat = require('./fixtures/createChat');
const createUser = require('./fixtures/createUser');
const createUserData = require('./fixtures/createUserData');
const getAuthorizationData = require('./fixtures/getAuthorizationData');

async function dropUsersCollection() {
  await User.deleteMany({});
}

async function dropChatsCollection() {
  await Chat.deleteMany({});
}

beforeAll(async () => {
  await dropUsersCollection();
  await dropChatsCollection();
});

afterAll(async () => {
  appListener.close();
  db.connection.close();
});

describe('/api/users', () => {
  const usersApiPath = '/api/users';

  it('GET', async () => {
    const admin = createUser(true);
    const auth = getAuthorizationData(admin.token);
    const usersCount = (await User.find({})).length;

    const user = await createUser();

    const { body } = await request(appListener)
      .get(usersApiPath)
      .set(auth.key, auth.value)
      .expect(200);

    expect(body.length).toBe(usersCount + 1);
    expect(body.map((user) => user._id)).toContainEqual(user._id);
    await User.findByIdAndDelete(user._id);
  });

  it('POST', async () => {
    const userData = createUserData();
    const { body } = await request(appListener)
      .post(usersApiPath)
      .send(userData)
      .expect(201);

    expect(body.token).toBeTruthy();
    expect(body._id).toBeTruthy();
    expect(body.email).toBe(userData.email);
    expect(body.username).toBe(userData.username);
    expect(Array.isArray(body.chats)).toBe(true);

    await User.findByIdAndDelete(body._id);
  });

  it('GET /:id', async () => {
    const admin = createUser(true);
    const auth = getAuthorizationData(admin.token);

    const { body } = await request(appListener)
      .get(`${usersApiPath}${admin._id}`)
      .set(auth.key, auth.value)
      .expect(200);

    expect(body._id).toBe(admin._id);
    await User.findByIdAndDelete(admin._id);
  });

  it('PUT /:id', async () => {
    const admin = await createUser(true);
    const auth = getAuthorizationData(admin.token);
    const username = admin.username + 'UPDATED';

    const { body } = await request(appListener)
      .put(`${usersApiPath}${admin._id}`)
      .send({ username })
      .set(auth.key, auth.value)
      .expect(204);

    expect(body.username).toBe(username);
    expect(body._id).toBe(admin._id);
    await User.findByIdAndDelete(admin._id);
  });

  it('DELETE /:id', async () => {
    const admin = await createUser(true);
    const auth = getAuthorizationData(admin.token);

    await request(appListener)
      .delete(usersApiPath + admin._id)
      .set(auth.key, auth.value)
      .expect(200);
  });
});

describe('/api/users/me', () => {
  const apiPath = '/api/users/me';

  it('GET', async () => {
    const user = await createUser();
    const auth = getAuthorizationData(user.token);

    const { body } = await request(appListener)
      .get(apiPath)
      .set(auth.key, auth.value)
      .expect(200);

    expect(body._id).toBe(user._id);
    await User.findByIdAndDelete(user._id);
  });

  it('PUT', async () => {
    const user = await createUser();
    const auth = getAuthorizationData(user.token);
    const username = user.username + 'ME';

    const { body } = await request(appListener)
      .put(apiPath)
      .send({ username })
      .set(auth.key, auth.value)
      .expect(204);

    expect(body.username).toBe(username);
    expect(body._id).toBe(user._id);

    await User.findByIdAndDelete(user._id);
  });
});

describe('/api/users/me/chats', () => {
  const apiPath = '/api/users/me/chats';

  it('Get', async () => {
    const user = await createUser();
    const chat = await createChat(user._id);
    const auth = getAuthorizationData(user.token);

    await User.findByIdAndUpdate(user._id, {
      $push: { chats: chat._id },
    });

    const { body } = await request(appListener)
      .get(apiPath)
      .set(auth.key, auth.value)
      .expect(200);

    expect(body).toContainEqual(chat._id);

    await Chat.findByIdAndDelete(chat._id);
    await User.findByIdAndDelete(user._id);
  });

  it('ADD', async () => {
    const user = await createUser();
    const chat = await createChat(user._id);
    const auth = getAuthorizationData(user.token);

    const { body } = await request(appListener)
      .post(apiPath)
      .send({ chat: chat._id })
      .set(auth.key, auth.value)
      .expect(200);

    expect(body.chats).toContainEqual(chat._id);

    await Chat.findByIdAndDelete(chat._id);
    await User.findByIdAndDelete(user._id);
  });

  it('Delete chat', async () => {
    const user = await createUser();
    const chat = await createChat(user._id);
    const auth = getAuthorizationData(user.token);

    await User.findByIdAndUpdate(user._id, {
      $push: { chats: chat._id },
    });

    const { body } = await request(appListener)
      .delete(apiPath)
      .send({ chat: chat._id })
      .set(auth.key, auth.value)
      .expect(200);

    expect(body.chats).not.toContainEqual(chat._id);

    await Chat.findByIdAndDelete(chat._id);
    await User.findByIdAndDelete(user._id);
  });
});
