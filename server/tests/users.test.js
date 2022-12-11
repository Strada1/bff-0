import request from 'supertest';
import { app } from '../server.js';

describe('/users', () => {

  it('POST / should register user and return status 201', async () => {
    const user = {
      "email": "test@test.ru",
      "password": "somepass",
      "username": "holy_pancake",
    };

    const { body } = await request(app)
      .post('/api/users/registration')
      .send(user)
      .expect(201);

    expect(body.email).toBe(user.email);
  });

  it('POST / should return 404 BadRequest if email or username already exists', async () => {
    const user = {
      "email": "admin@test.ru",
      "username": "admin",
    };

    await request(app)
      .post('/api/users/registration')
      .send(user)
      .expect(400);
  });

});