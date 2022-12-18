const User = require('../models/User')

const userRoles = { client: 'client', admin: 'admin' };

const getUsers = () => {
    return User.find().lean()
}

const getUser = (id) => {
    return User.findById({ _id: id }).lean()
}

const createUser = ({ username, email, token, roles = [userRoles.admin] }) => {
    return User.create({ username, email, token, roles })
}

const deleteUser = (id) => {
    return User.findByIdAndDelete({ _id: id }).lean()
}

const updateUser = (id, { username }) => {
    return User.findByIdAndUpdate({ _id: id }, { username }, {
        new: true
    }).lean()
}

module.exports = {
    userRoles,
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}