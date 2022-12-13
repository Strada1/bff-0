import request from 'supertest';
import mongoose from 'mongoose';

import { app, serverListener } from '../src/server.js';

import.meta.jest.spyOn(console, 'log').mockImplementation(() => undefined);

describe('/', () => {

  afterAll(() => {
    mongoose.connection.close();
    serverListener.close();
  });

  it('GET / should return "Hello World" and status 200', async () => {
    const { body } = await request(app)
      .get('/api/users')
      .expect(200);

    expect(body.message).toBe('Hello World');
  });

});
