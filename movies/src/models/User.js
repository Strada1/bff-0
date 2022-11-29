const mongoose = require('../db');

const UserSchema = new mongoose.Schema(
  {
    email: String,
    username: String,
    roles: [String],
    token: String
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('User', UserSchema);