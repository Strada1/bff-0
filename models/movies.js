import db from '../ext/db.js'

const MovieSchema = new db.Schema({
  title: String,
  year: Number,
  rating: Number,
  category: {type: db.Types.ObjectId, ref: 'categories'},
  duration: String,
  director: String
})

const movieModel = db.model('Movie', MovieSchema)

export default movieModel
