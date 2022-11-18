import Category from '../models/categories.js'

const createCategory = payload => {
  return Category.create(payload)
}

const getAllCategory = () => {
  return Category.find().lean()
}

const updateCategory = (id, payload) => {
  return Category.findByIdAndUpdate(id, payload)
}

const deleteCategory = id => {
  return Category.findByIdAndDelete(id)
}

export {createCategory, getAllCategory, updateCategory, deleteCategory}
