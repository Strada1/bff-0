const { ObjectId } = require('mongodb');
const { WebSocketServer } = require('ws');
const { getChat } = require('./services/chatsServices');
const { getUserByToken, getUserById } = require('./services/userServices');
const { createMessage } = require('./services/messageServices');
const wss = new WebSocketServer({ port: process.env.WSS_PORT });

let wsUsers = [];
const SOCKET_MESSAGES_TYPES = {
  UPDATE_CHATS: 'UPDATE CHATS',
  MESSAGE: 'MESSAGE',
  ERROR: 'ERROR',
  CONNECTED: 'CONNECTED',
};

wss.on('connection', async (ws, { url }) => {
  const token = url.slice(1);
  try {
    const user = await getUserByToken(token);

    if (!user) {
      ws.send(
        JSON.stringify({
          type: SOCKET_MESSAGES_TYPES.ERROR,
          error: 'Not Auth.',
        })
      );
      ws.close();
      return;
    }

    wsUsers.push({ token, chats: user.chats, ws });
    ws.send(
      JSON.stringify({
        type: SOCKET_MESSAGES_TYPES.CONNECTED,
        message: 'Connected',
      })
    );

    ws.on('close', () => {
      wsUsers = wsUsers.filter((user) => user.token !== token);
      return;
    });

    ws.on('message', onMessage(ws, user._id));
  } catch (error) {
    ws.send(
      JSON.stringify({
        type: SOCKET_MESSAGES_TYPES.ERROR,
        error: error.message,
      })
    );
    wsUsers = wsUsers.filter((user) => user.token !== token);
    ws.close();
    console.log(error);
  }
});

const onMessage = (ws, userId) => {
  return async function (data) {
    try {
      const isMessageValid = await validateMessage(data, userId);
      if (!isMessageValid) {
        ws.send(
          JSON.stringify({
            type: SOCKET_MESSAGES_TYPES.ERROR,
            error: 'Message not valid',
          })
        );
        return;
      }
      const userMessage = JSON.parse(data.toString());
      const message = await createMessage(userMessage, userId);
      if (!message) {
        ws.send(
          JSON.stringify({
            type: SOCKET_MESSAGES_TYPES.ERROR,
            error: 'Failed to create message',
          })
        );
        return;
      }
      const addressees = wsUsers.filter((user) =>
        user.chats.includes(message.chat)
      );
      addressees.forEach((user) => {
        user.ws.send(
          JSON.stringify({ type: SOCKET_MESSAGES_TYPES.MESSAGE, message })
        );
      });
    } catch (error) {
      ws.send(
        JSON.stringify({
          type: SOCKET_MESSAGES_TYPES.ERROR,
          error: error.message,
        })
      );
    }
  };
};

async function validateMessage(data, userId) {
  const message = !data.toString() ? undefined : JSON.parse(data.toString());
  if (!message || typeof message !== 'object') {
    return false;
  }
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
  const chatHasUser = chat.users.includes(userId);

  return chatHasUser;
}

const updateWsUsersChats = async (users = []) => {
  for (const userId of users) {
    const user = await getUserById(userId);
    wsUsers.forEach((wsUser) => {
      if (wsUser.token === user.token) {
        wsUser.chats = user.chats;
        wsUser.ws.send(
          JSON.stringify({
            type: SOCKET_MESSAGES_TYPES.UPDATE_CHATS,
            chats: wsUser.chats,
          })
        );
      }
    });
  }
};

module.exports = updateWsUsersChats;
