import db from '../ext/db.js'

const MovieSchema = new db.Schema({
  title: String,
  year: Number,
  rating: Number,
  category: {type: 'ObjectId', ref: 'Category'},
  duration: Number,
  director: {type: 'ObjectId', ref: 'Director'},
  comments: [{type: 'ObjectId', ref: 'Comment'}]
})

const movieModel = db.model('Movie', MovieSchema)

export default movieModel
