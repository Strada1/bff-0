const { Router } = require('express');
const {
  createMovie,
  deleteMovie,
  updateMovie,
  getMovie,
  getMovies,
} = require('../services/movieServices');
const { deleteAllMovieComments } = require('../services/commentServices');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const movies = await getMovies();
    return res.status(200).json(movies);
  } catch (error) {
    return res
      .status(500)
      .send('failed to get movies\nerror: ' + error.message);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const movie = await getMovie(id);
    if (!movie) {
      return res.status(404).send(`Movie id:${id} - not found`);
    }
    return res.status(200).json(movie);
  } catch (error) {
    return res
      .status(500)
      .send(`failed to get movie ${id}\nerror: ` + error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const movie = await createMovie(req.body);
    return res.status(201).json(movie);
  } catch (error) {
    return res
      .status(500)
      .send('failed to create movie\nerror: ' + error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteMovie(req.params.id);
    await deleteAllMovieComments(deleted._id);
    return res.status(200).send('movie deleted');
  } catch (error) {
    return res
      .status(500)
      .send('failed to delete movie\nerror: ' + error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const movie = await updateMovie(req.params.id, req.body);

    if (!movie) {
      return res.status(404).send(`Movie id:"${req.params.id}" - Not found`);
    }

    return res.status(200).send('movie updated successfully');
  } catch (error) {
    return res
      .status(500)
      .send('failed to update movie\nerror: ' + error.message);
  }
});

module.exports = router;
