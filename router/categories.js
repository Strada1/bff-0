const Router = require('express');
const {PATH} = require('../constant/constant');
const Category = require('../models/CategorySchema');

const categories = new Router();

categories.get(PATH.CATEGORIES, async (req, res) => {
    try {
        const _category = await Category.find({});
        return res.send(_category);
    } catch (e) {
        console.log(e)
        return res.status(500).send(e);
    }
})

categories.post(PATH.CATEGORIES, async (req, res) => {
    try {
        const {title} = req.body;

        const _category = await Category.create({title});

        return res.send(_category);
    } catch (e) {
        console.log(e)
        return res.status(500).send(e);
    }
});


categories.put(PATH.CATEGORIES, async (req, res) => {
    try {
        const {id, title} = req.body;

        const _category = await Category.findByIdAndUpdate(id, {title}, {returnDocument: 'after'});

        return res.send(_category);
    } catch (e) {
        console.log(e)
        return res.status(500).send(e);
    }
})


categories.delete(PATH.CATEGORIES, async (req, res) => {
    try {
        const {id} = req.body;

        const _category = await Category.findByIdAndDelete(id);

        return res.send(_category);
    } catch (e) {
        console.log(e)
        return res.status(500).send(e);
    }
});

module.exports = categories;