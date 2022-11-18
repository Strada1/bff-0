const Category = require('../models/Category')

const getCategories = () => {
    return Category.find()
}

const createCategory = (data) => {
    return Category.create(data)
}

const updateCategory = (categoryId, data) => {
    return Category.findByIdAndUpdate({ _id: categoryId }, data, { new: true })
}

const deleteCategory = (categoryId) => {
    return Category.findByIdAndDelete({ _id: categoryId })
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}
