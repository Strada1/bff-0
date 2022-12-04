const User = require('../models/UserSchema');

const createUser = async ({ email, username, roles = ['user'], token }) => {
    const hasUser = await includeUser(email);
    if (hasUser) {
        return {}
    }
    return User.create({ email, username, roles, token });
}

const includeUser = async (email) => {
    const user = await getUsers({email});
    return user.length !== 0;
}

const getUsers = (query = {}) => {
    return User.find(query);
}

const getByAuthUser = ({ email, password }) => {
    return User.aggregate([
        {
            $match: {
                email,
                password
            },
        },
    ])
}

const getByIdUser = (id) => {
    return User.findById(id);
}

const updateUser = ({ userId, email, username }) => {
    return User.findByIdAndUpdate(userId, { email, username }, { new: true, rawResult: true });
}

const deleteUser = (userId) => {
    return User.findByIdAndDelete(userId);
}

module.exports = {
    createUser, getUsers, getByIdUser, updateUser, deleteUser, getByAuthUser
}