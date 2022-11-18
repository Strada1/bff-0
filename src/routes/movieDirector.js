const express = require('express');
const router = express.Router();
const DIRECTOR = require('../services/directorService');

router.post('/', async (req, res) => {
  try {
    await DIRECTOR.CREATE(req.body);
    return res.status(201).send('director posted');
  } catch (e) {
    return res.status(500).send('error');
  }
});

router
  .route('/:directorId')
  .get((req, res) => {
    try {
      const directorId = req.params.directorId;
      DIRECTOR.GET(directorId, (error, director) => {
        if (error) throw new Error('Read Error');
        return res.status(201).send(director);
      });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  })
  .put(async (req, res) => {
    try {
      const directorId = req.params.directorId;
      await DIRECTOR.UPDATE(directorId, req.body);
      return res.status(201).send(`director ${directorId} updated`);
    } catch (e) {
      return res.status(500).send('error');
    }
  })
  .delete(async (req, res) => {
    try {
      const directorId = req.params.directorId;
      await DIRECTOR.DELETE(directorId);
      return res.status(201).send(`director ${directorId} deleted`);
    } catch (e) {
      return res.status(500).send('error');
    }
  });

module.exports = router;
