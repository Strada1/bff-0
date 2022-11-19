const Category = require('../models/CategorySchema');

const createCategory = ({ title }) => {
    return Category.create({ title });
}

const findCategories = () => {
    return Category.find();
}

const updateCategory = ({ id, ...updates }) => {
    return Category.findByIdAndUpdate(id, {...updates}, { new: true, rawResult: true });
}

const deleteCategory = ({ id }) => {
    return Category.findByIdAndDelete(id);
}

module.exports = {
    createCategory, findCategories, updateCategory, deleteCategory
}