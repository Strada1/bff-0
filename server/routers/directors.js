import { Router } from 'express';
import ApiError from '../exceptions/apiError.js';

import {
  createDirector,
  getDirector,
  getDirectors,
  updateDirector,
  deleteDirector,
} from '../services/director.js';

const router = new Router();

router.post('/', async (req, res, next) => {
  try {
    const { name } = req.body;
    const director = await createDirector(name);

    return res.status(201).send(director);
  } catch (err) {
    next(err);
  }
});

router.get('/:directorId', async (req, res, next) => {
  try {
    const { directorId } = req.params;
    const director = await getDirector(directorId);

    if (!director) {
      return next( ApiError.NotFound('No director for this ID') );
    }

    return res.status(200).send(director);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const directors = await getDirectors();

    return res.status(200).send(directors);
  } catch (err) {
    next(err);
  }
});

router.put('/:directorId', async (req, res, next) => {
  try {
    const { directorId } = req.params;
    const { name } = req.body;
    const updatedDirector = await updateDirector(directorId, name);

    if (!updatedDirector) {
      return next( ApiError.NotFound('No director for this ID') );
    }

    return res.status(200).send(updatedDirector);
  } catch (err) {
    next(err);
  }
});

router.delete('/:directorId', async (req, res, next) => {
  try {
    const { directorId } = req.params;
    const deletedDirector = await deleteDirector(directorId);

    if (!deletedDirector) {
      return next( ApiError.NotFound('No director for this ID') );
    }

    return res.status(200).send(deletedDirector);
  } catch (err) {
    next(err);
  }
});

export default router;
