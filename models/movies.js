const db = require('../ext/db')
const MovieSchema = new db.Schema({
  title: String,
  year: Number,
  rating: Number,
  category: String,
  duration: String,
  director: String
})

module.exports = db.model('Movie', MovieSchema)
