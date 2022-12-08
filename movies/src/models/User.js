const mongoose = require('../db');
const { ObjectId } = require('mongodb');

const UserSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    roles: [String],
    token: String,
    favorites: [{ type: ObjectId, ref: 'Movie' }]
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('User', UserSchema);