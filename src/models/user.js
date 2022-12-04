const { mongoose } = require('../db');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, dropDups: true },
  username: String,
  roles: { type: [ String ], default: [ 'user' ] },
  token: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
