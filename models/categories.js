import db from '../ext/db.js'

const CategoriesSchema = new db.Schema({
  title: String
})

const categoriesModel = db.model('Category', CategoriesSchema)

export default categoriesModel
