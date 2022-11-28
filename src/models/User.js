const mongoose = require('../db.js');

const UserSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  roles: [String],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
