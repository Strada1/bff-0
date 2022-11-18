const Category = require('../models/Category')

const getCategories = () => {
    return Category.find().lean().populate('movies')
}

const createCategory = (data) => {
    return Category.create(data).populate('movies')
}

const updateCategory = (categoryId, data) => {
    return Category.findByIdAndUpdate({ _id: categoryId }, data, {
        new: true,
    }).lean()
}

const deleteCategory = (categoryId) => {
    return Category.findByIdAndDelete({ _id: categoryId }).lean()
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}
