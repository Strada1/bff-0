import db from '../ext/db.js'

const UserSchema = new db.Schema({
  chats: [{type: 'ObjectID', ref: 'Chat'}],
  email: String,
  username: String,
  token: String
})

const userModel = db.model('User', UserSchema)

export default userModel
