const {Category} = require("../schemas");

function createCategory(options) {
    return Category.create(options)
}

function findAllCategories() {
    return Category.find({}).lean()
}

function findByIdAndUpdateCategory(id, options) {
    return Category.findByIdAndUpdate(id, options).lean()
}

function deleteCategory(id) {
    return Category.findByIdAndDelete(id).lean()
}

module.exports = {createCategory, findAllCategories, findByIdAndUpdateCategory, deleteCategory}