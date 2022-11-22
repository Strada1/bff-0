import db from '../ext/db.js'

const CommentsSchema = new db.Schema({
  author: String,
  text: String
})

const commentsModel = db.model('Comment', CommentsSchema)

export default commentsModel
