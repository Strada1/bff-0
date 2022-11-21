const express = require('express');
const router = express.Router();
const directorService = require('../services/directors.service');

router.get('/', async (req, res) => {
  try {
    const response = await directorService.getDirector();
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.post('/', async (req, res) => {
  try {
    const director = await directorService.createDirector(req.body);
    return res.status(201).send(director);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const idDirector = req.params.id;
    const response = await directorService.updateDirector(idDirector, {
      fullName: req.body.fullName,
    });
    return res.status(201).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const idDirector = req.params.id;
    const response = await directorService.deleteDirector(idDirector);
    return res.status(200).send(response);
  } catch (err) {
    return res.status(500).json({ error: err, code: 500 });
  }
});

module.exports = router;
