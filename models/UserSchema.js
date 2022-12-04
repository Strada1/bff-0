const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    roles: [String],
    favorites: [],
    token: String
});

module.exports = mongoose.model('User', UserSchema);