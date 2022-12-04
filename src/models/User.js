const { ObjectId } = require('mongodb');
const mongoose = require('../db.js');

const UserSchema = mongoose.Schema({
  email: String,
  username: String,
  token: String,
  roles: [String],
  favorites: [{ type: ObjectId, ref: 'Movie' }],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
