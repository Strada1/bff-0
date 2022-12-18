const { ObjectId } = require('mongodb');
const { WebSocketServer } = require('ws');
const { getChat } = require('./services/chatsServices');
const { getUserByToken } = require('./services/userServices');
const { createMessage } = require('./services/messageServices');
const wss = new WebSocketServer({ port: process.env.WSS_PORT });

let wsUsers = [];

wss.on('connection', async (ws, { url }) => {
  const token = url.slice(1);
  try {
    const user = await getUserByToken(token);

    if (!user) {
      ws.send('Not Auth.');
      ws.close();
      return;
    }

    wsUsers.push({ token, chats: user.chats, ws });
    ws.send('Connected');

    ws.on('close', () => {
      wsUsers = wsUsers.filter((user) => user.token !== token);
      return;
    });

    ws.on('message', onMessage(ws, user._id));
  } catch (error) {
    ws.send(JSON.stringify({ error: error.message }));
    wsUsers = wsUsers.filter((user) => user.token !== token);
    ws.close();
    console.log(error);
  }
});

const onMessage = (ws, userId) => {
  return async function (data) {
    try {
      const userMessage = !data.toString()
        ? false
        : JSON.parse(data.toString());
      if (!userMessage || typeof userMessage !== 'object') {
        ws.send('Bad request.');
        return;
      }
      const isMessageValid = await validateMessage(userMessage);
      if (!isMessageValid) {
        ws.send('Message not valid');
        return;
      }
      const message = await createMessage(userMessage, userId);
      if (!message) {
        ws.send('Failed to create message');
        return;
      }
      const addressees = wsUsers.filter((user) =>
        user.chats.includes(message.chat)
      );
      addressees.forEach((user) => {
        user.ws.send(JSON.stringify(message));
      });
    } catch (error) {
      ws.send(JSON.stringify({ error: error.message }));
    }
  };
};

async function validateMessage(message) {
  if (!message.text?.length || typeof message.text !== 'string') {
    return false;
  }
  if (!ObjectId.isValid(message.chat)) {
    return false;
  }
  const chat = await getChat(message.chat);
  if (!chat) {
    return false;
  }

  return true;
}

module.exports = wss;
