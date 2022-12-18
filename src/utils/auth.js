const jwt = require('jsonwebtoken');
const User = require('../models/User')
const { userRoles } = require("../services/user");

const createToken = (email, password) => {
    return jwt.sign({ email, password }, process.env.JWT_SECRET);
};

const getUserByToken = async (token) => {
    const user = await User.findOne({ token });
    if (!user) return undefined;
    return user;
};

const checkRole = (role) => {
    return async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        const user = await getUserByToken(token);
        const isRightsEnough = (user && user.roles.includes(userRoles[role]));
        if (!isRightsEnough) return res.status(403).send('you don\'t have enough rights');
        next();
    }
};

module.exports = { createToken, checkRole };