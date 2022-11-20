const express = require('express');
const router = express.Router();
const {
  showAllDirectors,
  createDirector,
  updateDirectors,
  deliteDirector,
} = require('../services/directorService.js');

router.get('/all', async (req, res) => {
  try {
    const data = await showAllDirectors();
    return res.status(201).json(data);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.post('/', async (req, res) => {
  try {
    await createDirector(req.body);
    return res.status(201).send('Director adding');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await updateDirectors(req.body._id, req.body);
    return res.status(201).send('Director updated');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deliteDirector(req.body);
    return res.status(201).send('Director delited');
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
