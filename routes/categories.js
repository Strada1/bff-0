const express = require('express')
const router = express.Router()
const Category = require('../models/categories')
router.post('/', async (req, res) => {
  try {
    await Category.create(req.body)
    return res.status(201).send('category created')
  } catch (error) {
    console.log(error)
    return res.status(400).send("category isn't create")
  }
})

module.exports = router
