import { configChatData } from './configChatData.js';

export function configUserData(data, secretData) {
  return {
    id: data._id,
    email: data.email,
    nickname: data.nickname,
    username: data.username,
    chats: data.chats.map(configChatData),
    roles: data.roles,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    ...secretData,
  };
}
