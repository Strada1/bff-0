const User = require('../models/UserSchema');

const createUserService = async ({ email, username, token, chats = [] }) => {
    return User.create({ email, username, token, chats });
}

const getUsersService = (query = {}) => {
    return User.find(query);
}

const getByIdUserService = (id) => {
    return User.findById(id);
}

const getByTokenUserService = async (token) => {
    const [user] = await User.find({token});
    return user;
}

const updateUserService = ({ userId, username, chats }) => {
    return User.findByIdAndUpdate(userId, { username, chats }, { new: true, rawResult: true });
}

const updateEmailUserService = ({ userId, email, token }) => {
    return User.findByIdAndUpdate(userId, { email, token }, { new: true, rawResult: true });
}

const deleteUserService = (userId) => {
    return User.findByIdAndDelete(userId);
}

module.exports = {
    createUserService, getUsersService, getByIdUserService, getByTokenUserService, updateUserService, updateEmailUserService, deleteUserService,
}