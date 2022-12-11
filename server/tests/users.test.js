import request from 'supertest';
import mongoose from 'mongoose';

import { app, serverListener }  from '../server.js';
import {
  dataForNewUser,
  alreadyUserDataForUser,
} from './fixtures/users.js';

import.meta.jest.spyOn(console, 'log').mockImplementation(() => undefined);

describe('/users', () => {

  afterAll(() => {
    mongoose.connection.close();
    serverListener.close();
  });

  it('POST / should register user and return status 201', async () => {
    const { body } = await request(app)
      .post('/api/users/registration')
      .send(dataForNewUser)
      .expect(201);

    expect(body.email).toBe(dataForNewUser.email);
  });

  it('POST / should return 404 BadRequest if email or username already exists', async () => {
    await request(app)
      .post('/api/users/registration')
      .send(alreadyUserDataForUser)
      .expect(400);
  });

});