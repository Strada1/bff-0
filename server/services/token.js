import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

export function decodeToken(token) {
  return jwt.decode(token);
}