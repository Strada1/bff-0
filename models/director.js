import db from '../ext/db.js'

const DirectorsSchema = new db.Schema({
  name: String
})

const directorsModel = db.model('Director', DirectorsSchema)

export default directorsModel
