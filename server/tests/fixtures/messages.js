import Message from '../../src/models/Message.js';

export function createMessage(userId, chatId) {
  return Message.create({
    user: userId,
    text: 'test message',
    chat: chatId,
  });
}

export async function createMessages(count, userId, chatId) {
  let messages = [];

  for (let i = 0; i < count; i++) {
    messages.push(await createMessage(userId, chatId))
  }

  return messages;
}