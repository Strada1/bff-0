import Chat from '../../src/models/Chat.js';

export function getChatInputData(data) {
  return {
    title: data?.title || 'test_chat',
  };
}

export function createChat({ id, title = 'test_chat', users = [], owner } = {}) {
  const chatFields = {
    title,
    users,
    owner,
  };

  if (id) {
    chatFields._id = id;
  }

  return Chat.create(chatFields);
}