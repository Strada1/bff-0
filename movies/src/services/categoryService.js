const Category = require('../models/Category')

const getCategories = () => {
    return Category.find()
}

const createCategory = (data) => {
    return Category.create(data)
}

const updateCategory = (id, data) => {
    return Category.findByIdAndUpdate(id, data, { new: true })
}

module.exports = { getCategories, createCategory, updateCategory }
