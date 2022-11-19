const Router = require('express');
const { createDirector, findDirectors, updateDirector, deleteDirector } = require("../services/directorService");

const directors = new Router();

directors.get('/directors', async (req, res) => {
    try {
        const director = await findDirectors();
        return res.status(200).send(director);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

directors.post('/directors', async (req, res) => {
    try {
        const director = await createDirector(req.body);
        return res.status(201).send(director);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

directors.put('/directors', async (req, res) => {
    try {
        const director = await updateDirector(req.body);
        return res.status(200).send(director);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

directors.delete('/directors', async (req, res) => {
    try {
        const { id } = req.body;
        await deleteDirector(id);
        return res.status(200).send('delete');
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports = directors;