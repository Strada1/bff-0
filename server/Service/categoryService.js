const CategoryModel = require("../models/category");

module.exports = {
    getAllCategory: async () => {
        const category = await CategoryModel.find({});
        return category;
    },

    findCategoryById: async id => {
        const category = await CategoryModel.findById(id);
        return category;
    },

    createNewCategory: async body => {
        const category = new CategoryModel(body);
        const result = await category.save();
        return result;
    },

    updateCategory: async (id, updates, options) => {
        const category = await CategoryModel.findByIdAndUpdate(id, updates, options);
        return category;
    },

    deleteCategory: async id => {
        const category = await CategoryModel.findByIdAndDelete(id);
        return category;
    }
};
