const {Router} = require('express');
const {movieModel} = require('../models');

const movieRouter = Router();

movieRouter.get('/', (req, res) => {
    res.status(200).send('<h1>Home</h1>')
})

movieRouter.get('/movies', async (req, res) => {
    try {
        const response = await movieModel.collection.find().toArray()
        return res.status(200).send(response)
    } catch (e) {
        console.log(e)
        return res.status(500).send('bad request')
    }
})

movieRouter.post('/movies', async (req, res) => {
    try {
        await movieModel.create(req.body);
        return res.status(201).send('movie created');
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not create movie')
    }
});

module.exports = {movieRouter};
