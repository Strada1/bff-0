import request from 'supertest';
import mongoose from 'mongoose';

import User from '../src/models/User.js';
import Chat from '../src/models/Chat.js';

import { app, serverListener } from '../src/server.js';
import { getUserInputData, createUser } from './fixtures/users.js';
import { createChat } from './fixtures/chats';

import.meta.jest.spyOn(console, 'log').mockImplementation(() => undefined);

describe('/users', () => {

  beforeAll(async () => {
    await User.deleteMany();
    await Chat.deleteMany();
  });

  afterAll(() => {
    mongoose.connection.close();
    serverListener.close();
  });

  it('POST / should create user with correct input data and return status 201', async () => {
    const userInputData = getUserInputData();

    const { body: createdUser } = await request(app)
      .post('/api/users/registration')
      .send(userInputData)
      .expect(201);

    expect(createdUser).toEqual({
      id: expect.any(String),
      email: userInputData.email,
      token: expect.any(String),
      nickname: userInputData.nickname,
      username: userInputData.username,
      chats: [],
      roles: ['user'],
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    await User.findByIdAndDelete(createdUser.id);
  });

  it('POST / should authenticate user and return status 200', async () => {
    const user = await createUser();
    const { email, password } = getUserInputData();

    const { body: authenticatedUser } = await request(app)
      .post('/api/users/login')
      .send({ email, password })
      .expect(200);

    expect(authenticatedUser.token).toBe(user.token);
    expect(authenticatedUser.email).toBe(user.email);

    await User.findByIdAndDelete(user._id);
  });

  it('GET / should return user and status 200', async () => {
    const admin = await createUser({ isAdmin: true });
    const user = await createUser();

    const { body } = await request(app)
      .get(`/api/users/${user.id}`)
      .set('Authorization', `Bearer ${admin.token}`)
      .expect(200);

    expect(body.id).toBe(user._id.toString());

    await User.findByIdAndDelete(admin._id);
    await User.findByIdAndDelete(user._id);
  });

  it('GET / should return users and status 200', async () => {
    const admin = await createUser({ isAdmin: true });
    const user = await createUser();

    const { body: users } = await request(app)
      .get('/api/users')
      .expect(200);

    expect(users).toBeInstanceOf(Array);
    expect(users.map(user => user.id)).toContain(admin._id.toString());
    expect(users.map(user => user.id)).toContain(user._id.toString());

    await User.findByIdAndDelete(admin._id);
    await User.findByIdAndDelete(user._id);
  });

  it('PUT / with an authenticated user should update user and return status 200', async () => {
    const user = await createUser();
    const userUpdateData = {
      password: 'updatedPass',
      nickname: 'updated_nickname',
      username: 'Updated Username',
    };

    const { body: updatedUser } = await request(app)
      .put('/api/users/me')
      .set('Authorization', `Bearer ${user.token}`)
      .send(userUpdateData)
      .expect(200);

    expect(updatedUser.token).not.toBe(user.token);
    expect(updatedUser.nickname).toBe(userUpdateData.nickname);
    expect(updatedUser.username).toBe(userUpdateData.username);

    await User.findByIdAndDelete(user._id);
  });

  it('PUT / with "admin" rights should update the user and return status 200', async () => {
    const admin = await createUser({ isAdmin: true });
    const user = await createUser();
    const chat_1 = await createChat();
    const chat_2 = await createChat({
      title: 'test_chat_2',
    });

    const userUpdateData = {
      roles: ['user', 'moderator'],
      chats: [chat_1._id, chat_2._id],
    };

    const { body: updatedUser } = await request(app)
      .put(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${admin.token}`)
      .send(userUpdateData)
      .expect(200);

    expect(updatedUser.roles).toEqual(userUpdateData.roles);
    expect(updatedUser.chats.map(chat => chat.id)).toContain(chat_1._id.toString());
    expect(updatedUser.chats.map(chat => chat.id)).toContain(chat_2._id.toString());

    await User.findByIdAndDelete(admin._id);
    await User.findByIdAndDelete(user._id);
    await Chat.findByIdAndDelete(chat_1._id);
    await Chat.findByIdAndDelete(chat_2._id);
  });

  it('DELETE / with "admin" rights should delete user and return status 204', async () => {
    const admin = await createUser({ isAdmin: true });
    const user = await createUser({
      chats: [new mongoose.Types.ObjectId()],
    });
    const chat = await createChat({
      id: user.chats[0],
      users: [user._id],
    });

    await request(app)
      .delete(`/api/users/${user._id}`)
      .set('Authorization', `Bearer ${admin.token}`)
      .expect(204);

    await User.findByIdAndDelete(admin._id);
    await User.findByIdAndDelete(user._id);
    await Chat.findByIdAndDelete(chat._id);
  });

});
