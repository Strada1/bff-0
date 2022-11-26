const Category = require('../models/Category')

const getCategories = (sort) => {
    const query = Category.find().lean().populate('movies')
    if (sort) query.sort(sort)
    return query.exec()
}

const createCategory = (data) => {
    return Category.create(data)
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
