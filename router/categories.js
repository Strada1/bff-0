const Router = require('express');
const { checkSchema } = require("express-validator");

const { createCategory, getCategories, updateCategory, deleteCategory } = require("../services/categoriesService");
const checkError = require("../helpers/checkError");

const categories = new Router();

categories.get(
    '/categories',
    async (req, res) => {
    try {
        const { sort } = req.query;
        const category = await getCategories(sort);
        return res.status(200).send(category);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

categories.post(
    '/categories',
    checkSchema({
        title: {
            in: ['body'],
            isString: true,
            isLength: {
                errorMessage: 'Title should be at least 2 chars long',
                options: { min: 2 },
            },
        },
    }),
    checkError,
    async (req, res) => {
    try {
        const category = await createCategory(req.body);
        return res.status(201).send(category);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

categories.put(
    '/categories/:categoryId',
    checkSchema({
        categoryId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
    try {
        const { categoryId } = req.params;
        const category = await updateCategory({categoryId, ...req.body});
        return res.status(200).send(category);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

categories.delete(
    '/categories/:categoryId',
    checkSchema({
        categoryId: {
            in: ['params'],
            isMongoId: true,
        },
    }),
    checkError,
    async (req, res) => {
    try {
        const { categoryId } = req.params;
        await deleteCategory(categoryId);
        return res.status(200).send('delete');
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports = categories;
