const Category = require('../models/category')
const { ROUTES } = require('../config');
const { Router } = require('express');
const categories = Router()

categories.post(ROUTES.CATEGORIES, async (req, res) => {
  try {
    console.log(req.body);
    await Category.create(req.body)

    return res.status(201).send('cateroties created')
  } catch (error) {
    res.status(500).send('Bad request')
  }
})


categories.get(ROUTES.CATEGORIES, async (req, res) => {
  try {
    const allCategories = await Category.find({});

    return res.status(200).send({
      categories: allCategories
    })
  } catch (error) {
    res.status(500).send('Bad request')
  }
})

module.exports = categories