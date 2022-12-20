import request from 'supertest';
import mongoose from 'mongoose';

import Chat from '../src/models/Chat.js';
import User from '../src/models/User.js';

import { app, serverListener } from '../src/server.js';
import { createChat, getChatInputData } from './fixtures/chats.js';
import { createUser } from './fixtures/users.js';

// import.meta.jest.spyOn(console, 'log').mockImplementation(() => undefined);

describe('/chats', () => {

  beforeAll(async () => {
    await User.deleteMany();
    await Chat.deleteMany();
  });

  afterAll(() => {
    mongoose.connection.close();
    serverListener.close();
  });

  it('POST / should create chat',  async () => {
    const user = await createUser();
    const chatInputData = getChatInputData();

    const { body: createdChat } = await request(app)
      .post('/api/chats')
      .set('Authorization', `Bearer ${user.token}`)
      .send(chatInputData)
      .expect(201);

    expect(createdChat).toEqual({
      id: expect.any(String),
      title: chatInputData.title,
      users: [user.id],
      owner: user.id,
    });

    const updatedUser = await User.findById(user.id);
    expect(updatedUser.chats.map(chatId => chatId.toString())).toContain(createdChat.id);

    await User.findByIdAndDelete(user._id);
    await Chat.findByIdAndDelete(createdChat.id);
  });

  it('GET / should return all chats', async () => {
    const user = await createUser();
    const chat_1 = await createChat();
    const chat_2 = await createChat({
      title: 'test_chat_2',
    });

    const { body: chats } = await request(app)
      .get('/api/chats')
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200);

    expect(chats[0].id).toContain(chat_1.id);
    expect(chats[1].id).toContain(chat_2.id);

    await User.findByIdAndDelete(user.id);
    await Chat.deleteMany();
  });

  it('GET / should return chats in which user is a member', async () => {
    const user = await createUser();
    const chat = await createChat();
    await createChat({
      title: 'test_chat_2',
      users: [user.id],
    });
    await createChat({
      title: 'test_chat_3',
      users: [user.id],
    });

    const { body: chats } = await request(app)
      .get(`/api/chats?user=${user.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200);

    expect(chats[0].users).toContain(user.id);
    expect(chats[1].users).toContain(user.id);
    expect(chat.users).not.toContain(user.id);

    await User.findByIdAndDelete(user.id);
    await Chat.deleteMany();
  });

  it('GET / should return chats created by user', async () => {
    const user = await createUser();
    await createChat();
    await createChat({
      title: 'test_chat_2',
      owner: user.id,
    });
    await createChat({
      title: 'test_chat_3',
      owner: user.id,
    });

    const { body: chats } = await request(app)
      .get(`/api/chats?owner=${user.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200);

    expect(chats[0].owner).toBe(user.id);
    expect(chats[1].owner).toBe(user.id);

    await User.findByIdAndDelete(user.id);
    await Chat.deleteMany();
  });

  it('GET / should return chat', async () => {
    const user = await createUser();
    const chat = await createChat();

    const { body } = await request(app)
      .get(`/api/chats/${chat.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200);

    expect(body.id).toBe(chat.id);

    await User.findByIdAndDelete(user.id);
    await Chat.findByIdAndDelete(chat.id);
  });

  it('PUT / должен обновить поле title', async () => {
    const user = await createUser();
    const chat = await createChat({
      owner: user._id,
    });

    const chatUpdateData = {
      title: 'updated_chat_title',
    };

    const { body: updatedChat } = await request(app)
      .put(`/api/chats/${chat.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .send(chatUpdateData)
      .expect(200);
    console.log(updatedChat);

    expect(updatedChat.title).toBe(chatUpdateData.title);

    await User.findByIdAndDelete(user.id);
    await Chat.findByIdAndDelete(chat.id);
  });

  it('POST / should add user to chat', async () => {
    const user = await createUser();
    const chat = await createChat();

    const { body: updatedChat } = await request(app)
      .post(`/api/chats/${chat.id}/users/me`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200);

    const updatedUser = await User.findById(user.id);

    expect(updatedChat.users).toContain(user.id);
    expect(updatedUser.chats.map(chatId => chatId.toString())).toContain(updatedChat.id);

    await User.findByIdAndDelete(user.id);
    await Chat.findByIdAndDelete(chat.id);
  });

  it('DELETE / should remove user from chat', async () => {
    const user = await createUser({
      chats: [new mongoose.Types.ObjectId()],
    });
    const chat = await createChat({
      id: user.chats[0],
      users: [user._id],
    });

    const { body: updatedChat } = await request(app)
      .delete(`/api/chats/${chat.id}/users/me`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200);

    const updatedUser = await User.findById(user.id);

    expect(updatedChat.users).not.toContain(user._id);
    expect(updatedUser.chats.map(chatId => chatId.toString())).not.toContain(updatedChat.id);

    await User.findByIdAndDelete(user.id);
    await Chat.findByIdAndDelete(chat.id);
  });

});
