import db from '../ext/db.js'

const MovieSchema = new db.Schema({
  title: String,
  year: Number,
  rating: Number,
  category: String,
  duration: String,
  director: String
})

const movieModel = db.model('Movie', MovieSchema)

export default movieModel
