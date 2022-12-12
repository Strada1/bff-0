import db from '../ext/db.js'

const MessageSchema = new db.Schema({
  user: {type: 'ObjectId', ref: 'User'},
  chatId: {type: 'ObjectId', red: 'Chat'},
  createdAt: {type: Date, default: Date.now},
  text: String
})

const messageModel = db.model('Message', MessageSchema)

export default messageModel
