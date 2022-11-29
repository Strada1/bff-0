import db from '../ext/db.js'

const UserSchema = new db.Schema({
  email: String,
  username: String,
  roles: [String],
  password: String
})

const userModel = db.model('User', UserSchema)

export default userModel
