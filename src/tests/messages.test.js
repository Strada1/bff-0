const request = require('supertest');
const app = require('src/app');
const db = require('src/db');
const { createMessage, deleteMessage } = require('./fixtures/messages');

describe('/messages', () => {
  it('get message', async () => {
    const message = await createMessage();
    const { body } = await request(app).get(`/messages/${message._id}`).expect(200);
    expect(body.text).toEqual(message.text);
    await deleteMessage(message._id);
  });

  it('post message', async () => {
    const message = await createMessage();
    const { body } = await request(app).post('/messages').send(message).expect(201);
    expect(body.text).toEqual(message.text);
    await deleteMessage(message._id);
  });

  it('update message', async () => {
    const message = await createMessage();
    const newData = { text: 'new test messagetext' };
    const { body } = await request(app)
      .patch(`/messages/${message._id}`)
      .send(newData)
      .expect(200);
    expect(body.text).toEqual(newData.text);
    await deleteMessage(message._id);
  });

  it('delete message', async () => {
    const message = await createMessage();
    await request(app).delete(`/messages/${message._id}`).expect(200);
  });

  afterAll((done) => {
    db.connection.close();
    app.close();
    done();
  });
});
