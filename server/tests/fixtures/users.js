import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

import User from '../../src/models/User';

export function getUserInputData(data, isAdmin) {
  return {
    email: data?.email || `${isAdmin ? 'admin' : 'test'}@mail.ru`,
    password: data?.password || `${isAdmin ? 'admin' : 'test'}Pass`,
    nickname: data?.nickname || `${isAdmin ? 'admin' : 'test'}_nick`,
    username: data?.username || `${isAdmin ? 'Admin' : 'Test'} Username`,
  };
}

export async function createUser({ isAdmin = false, roles = ['user'], chats, ...data } = {}) {
  const { email, password, nickname, username } = getUserInputData(data, isAdmin);

  const token = await jwt.sign({ email, password }, process.env.JWT_SECRET);

  if (isAdmin) {
    roles.push('admin');
  }

  return await User.create({ email, token, nickname, username, chats, roles });
}
