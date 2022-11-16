const Comment = require('../models/Comment');
const Movie = require('../models/Movie.js');
const { Router } = require('express');
const router = Router();

router.post('/', async (req, res) => {
  try {
    await Movie.create(req.body);
    return res.status(201).send('movie created');
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send('failed to create movie\nerror: ' + error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({
      _id: {
        $in: deleted.comments,
      },
    });
    return res.status(200).send(`movie deleted`);
  } catch (error) {
    return res
      .status(500)
      .send('failed to delete movie\nerror: ' + error.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body);

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
