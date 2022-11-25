const Category = require('../models/CategorySchema');

const createCategory = ({ title }) => {
    return Category.create({ title });
}

const findCategories = (sort) => {
    return Category.find()
        .sort(sort);
}

const updateCategory = ({ categoryId, ...updates }) => {
    return Category.findByIdAndUpdate(categoryId, {...updates}, { new: true, rawResult: true });
}

const deleteCategory = (categoryId) => {
    return Category.findByIdAndDelete(categoryId);
}

module.exports = {
    createCategory, findCategories, updateCategory, deleteCategory
}