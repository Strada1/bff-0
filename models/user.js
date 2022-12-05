import db from '../ext/db.js'

const UserSchema = new db.Schema({
  email: String,
  username: String,
  roles: [String],
  token: String,
  favorites: [{type: 'ObjectID', ref: 'Movie'}]
})

const userModel = db.model('User', UserSchema)

export default userModel
