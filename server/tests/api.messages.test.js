import request from 'supertest';
import mongoose from 'mongoose';

import Message from '../src/models/Message.js';
import Chat from '../src/models/Chat.js';
import User from '../src/models/User.js';

import { app, serverListener } from '../src/server.js';
import { createUser } from './fixtures/users.js';
import { createChat } from './fixtures/chats.js';
import { createMessage, createMessages } from './fixtures/messages.js';

// import.meta.jest.spyOn(console, 'log').mockImplementation(() => undefined);

describe('/messages', () => {

  beforeAll(async () => {
    await Message.deleteMany();
    await Chat.deleteMany();
    await User.deleteMany();
  });

  afterAll(() => {
    mongoose.connection.close();
    serverListener.close();
  });

  it('POST / should create message', async () => {
    const user = await createUser({
      chats: [new mongoose.Types.ObjectId()],
    });
    const chat = await createChat({
      id: user.chats[0],
      users: [user._id],
    });

    const messageInputData = {
      text: 'test text test text',
    };

    const { body: createdMessage } = await request(app)
      .post(`/api/messages?chatId=${chat.id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .send(messageInputData)
      .expect(201);

    expect(createdMessage.user).toBe(user.id);
    expect(createdMessage.chat).toBe(chat.id);
    expect(createdMessage.text).toBe(messageInputData.text);

    await Message.findByIdAndDelete(createdMessage.id);
    await User.findByIdAndDelete(user.id);
    await Chat.findByIdAndDelete(chat.id);
  });

  // GET '/api/messages?chatId=123123123123' authorization()
  // проверять, состоит ли юзер в чате
  it('GET / should return all chat messages', async () => {
    const user = await createUser();
    const admin = await createUser({
      isAdmin: true,
    });
    const chat_1 = await createChat({
      users: [user._id],
    });
    const chat_2 = await createChat({
      title: 'test_chat_2',
      users: [admin._id],
    });
    const createdMessages = await createMessages(2, user._id, chat_1._id);
    await createMessages(3, admin._id, chat_2._id);

    const { body: messages } = await request(app)
      .get(`/api/messages?chatId=${chat_1._id}`)
      .set('Authorization', `Bearer ${user.token}`)
      .expect(200);

    expect(messages.length).toBe(createdMessages.length);
    expect(messages[0].chat).toBe(chat_1.id);
    expect(messages[1].chat).toBe(chat_1.id);
    expect(messages[0].user.id).toBe(user.id);
    expect(messages[1].user.id).toBe(user.id);

    await User.deleteMany()
    await Chat.deleteMany()
    await Message.deleteMany()
  });

});