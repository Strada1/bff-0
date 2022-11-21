const express = require('express');
const router = express.Router();
const {
  getDirectors,
  createDirector,
  updateDirector,
  deleteDirector,
} = require('../services/directorService');

router.get('/directors', async (request, response) => {
  try {
    const directors = await getDirectors();

    response.status(200).send(directors);
  } catch (error) {
    console.log(error);
    response.status(500).send([]);
  }
});

router.post('/directors', async (request, response) => {
  try {
    const { director } = request.body;

    const createdDirector = await createDirector({
      director,
    });

    response.status(201).send(createdDirector);
  } catch (error) {
    console.log(error);
    response.status(500).send({});
  }
});

router.put('/directors/:directorId', async (request, response) => {
  try {
    const { directorId } = request.params;
    const updated = await updateDirector(directorId, request.body);
    response.status(200).send(updated);
  } catch (error) {
    console.log(error);
    response.status(500).send({});
  }
});

router.delete('/directors/:directorId', async (request, response) => {
  try {
    const { directorId } = request.params;
    const deleted = await deleteDirector(directorId);

    response.status(204).send(deleted);
  } catch (error) {
    console.log(error);
    response.status(500).send({});
  }
});

module.exports = router;
