const Router = require('express');
const { createCategory, findCategories, updateCategory, deleteCategory } = require("../services/categoriesService");

const categories = new Router();

categories.get('/categories', async (req, res) => {
    try {
        const category = await findCategories();
        return res.status(200).send(category);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

categories.post('/categories', async (req, res) => {
    try {
        const category = await createCategory(req.body);
        return res.status(201).send(category);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

categories.put('/categories', async (req, res) => {
    try {
        const category = await updateCategory(req.body);
        return res.status(200).send(category);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

categories.delete('/categories', async (req, res) => {
    try {
        await deleteCategory(req.body);
        return res.status(200).send('delete');
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports = categories;
