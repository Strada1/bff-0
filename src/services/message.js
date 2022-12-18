const Message = require('../models/Message')

const getMessages = () => {
    return Message.find().lean()
}

const getMessage = (id) => {
    return Message.findById({ _id: id }).lean()
}

const createMessage = (data) => {
    const { user, text, chatId } = data
    return Message.create({ user, text, chatId, createdAt: new Date() })
}

const deleteMessage = (id) => {
    return Message.findByIdAndDelete({ _id: id }).lean()
}

const updateMessage = (id, { text }) => {
    return Message.findByIdAndUpdate({ _id: id }, { text, updatedAt: new Date() }, {
        new: true
    }).lean()
}

module.exports = {
    getMessages,
    getMessage,
    createMessage,
    deleteMessage,
    updateMessage
}