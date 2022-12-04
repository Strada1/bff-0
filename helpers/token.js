const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { JWT_SECRET } = dotenv.config().parsed;

function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET);
}

function decodeToken(token) {
    return jwt.decode(token);
}

module.exports = {
    generateToken, decodeToken
}