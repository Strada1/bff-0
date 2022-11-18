const {default: mongoose} = require("mongoose");
const categoryService = require("../Service/categoryService");
const CategoryModel = require("../models/category");

module.exports = {
    getAllCategory: async (req, res) => {
        const category = await categoryService.getAllCategory();
        res.send(category);
    },

    findCategoryById: async (req, res) => {
        try {
            const id = req.params.id;
            const category = await categoryService.findCategoryById(id);

            if (!category) {
                return res.status(404).send("Category does not exist");
            }

            return res.status(200).send(category);
        } catch (err) {
            console.log(err.message);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Category Id");
            }
            next(err);
        }
    },

    createNewCategory: async (req, res, next) => {
        try {
            const category = await categoryService.createNewCategory(req.body);
            return res.status(201).send({code: 201, message: "add categories", category});
        } catch (err) {
            console.log(err);
            if (err.name === "ValidationError") {
                return res.status(422).send(err.message);
            }
            next(err);
        }
    },

    updateCategory: async (req, res, next) => {
        try {
            const id = req.params.id;
            const updates = req.body;
            const options = {new: true};

            const category = await categoryService.updateCategory(id, updates, options);
            if (!category) {
                return res.status(404).send("Category does not exist");
            }

            return res.status(200).send(category);
        } catch (err) {
            console.log(err.message);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Category Id");
            }
            next(err);
        }
    },

    deleteCategory: async (req, res, next) => {
        try {
            const id = req.params.id;

            // const category = categoryService.deleteCategory(id);
            // не работает обработка ошибок с сервисом при удалении

            const category = await CategoryModel.findByIdAndDelete(id);
            console.log({category});
            if (!category) {
                return res.status(404).send("Category does not exist");
            }

            return res.status(200).send("category deleted successfully");
        } catch (err) {
            console.log(err.message);
            if (err instanceof mongoose.CastError) {
                return res.status(400).send("Invalid Category Id");
            }
            next(err);
        }
    }
};
