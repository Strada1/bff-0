const Chat = require('../models/Chat')

const getChats = () => {
    return Chat.find().lean()
}

const getChat = (id) => {
    return Chat.findById({ _id: id }).lean()
}

const createChat = ({ title, users }) => {
    return Chat.create({ title, users })
}

const deleteChat = (id) => {
    return Chat.findByIdAndDelete({ _id: id }).lean()
}

const updateChat = (id, { title }) => {
    return Chat.findByIdAndUpdate({ _id: id }, { title }, {
        new: true
    }).lean()
}

module.exports = {
    getChats,
    getChat,
    createChat,
    deleteChat,
    updateChat
}