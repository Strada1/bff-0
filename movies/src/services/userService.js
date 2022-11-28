const User = require('../models/User')

const getUser = (userId) => {
    return User.findById(userId).lean()
}

const createUser = ({ email, password }) => {
    return User.create({ email, password })
}

const updateUser = (userId, data) => {
    return User.findByIdAndUpdate({ _id: userId }, data, {
        new: true,
    }).lean()
}

const deleteUser = (userId) => {
    return User.findByIdAndDelete({ _id: userId }).lean()
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
}
