import db from '../ext/db.js'

const ChatSchema = db.Schema({
  users: [{type: 'ObjectId', ref: 'User'}],
  title: String
})

const chatModel = db.model('chat', ChatSchema)

export default chatModel
