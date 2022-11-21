const { Router } = require('express');
const {
  getDirectors,
  getDirector,
  createDirector,
  updateDirector,
  deleteDirector,
} = require('../services/directorServices');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const directors = await getDirectors();
    return res.status(200).json(directors);
  } catch (error) {
    return res
      .status(500)
      .send('failed to get directors\nerror: ' + error.message);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const director = await getDirector(id);
    if (!director) {
      return res.status(404).send(`director id:${id} - not found`);
    }
    return res.status(200).json(director);
  } catch (error) {
    return res
      .status(500)
      .send(`failed to get director ${id}\nerror: ` + error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const director = await createDirector(req.body);
    return res.status(201).json(director);
  } catch (error) {
    return res
      .status(500)
      .send('failed to add director\nerror: ' + error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const director = await updateDirector(req.params.id, req.body);

    if (!director) {
      return res.status(404).send(`Director id:"${req.params.id}" - Not found`);
    }

    return res.status(200).send('Director updated successfully');
  } catch (error) {
    return res
      .status(500)
      .send('failed to update director\nerror: ' + error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await deleteDirector(req.params.id);
    return res.status(200).send('Director deleted');
  } catch (error) {
    return res
      .status(500)
      .send('failed to delete director\nerror: ' + error.message);
  }
});

module.exports = router;
