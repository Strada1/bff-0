import db from '../ext/db.js'

const UserSchema = new db.Schema({
  email: String,
  username: String,
  roles: [String],
  token: String,
  favorites: [String]
})

const userModel = db.model('User', UserSchema)

export default userModel
