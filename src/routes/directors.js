const { Router } = require('express');
const { validationResult, body } = require('express-validator');
const { checkRole } = require('../middlewares/checkRole');
const passport = require('../middlewares/passport');
const validate = require('../middlewares/validate');
const validateParamId = require('../middlewares/validateParamId');
const {
  getDirectors,
  getDirector,
  createDirector,
  updateDirector,
  deleteDirector,
  countMoviesByDirector,
} = require('../services/directorServices');
const { UserRoles } = require('../services/userServices');
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

router.get('/:id', validateParamId(), async (req, res) => {
  const id = req.params.id;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

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

router.post(
  '/',
  validate(['firstName', 'lastName']),
  passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const director = await createDirector(req.body);
      return res.status(201).json(director);
    } catch (error) {
      return res
        .status(500)
        .send('failed to add director\nerror: ' + error.message);
    }
  }
);

router.put(
  '/:id',
  validateParamId(),
  body('firstName', 'Should be string').isString().optional(),
  body('lastName', 'Should be string').isString().optional(),
  body('birthDay', 'Should be string').isDate().optional(),
  passport.authenticate('bearer', { session: false }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const director = await updateDirector(req.params.id, req.body);

      if (!director) {
        return res
          .status(404)
          .send(`Director id:"${req.params.id}" - Not found`);
      }

      return res.status(200).send('Director updated successfully');
    } catch (error) {
      return res
        .status(500)
        .send('failed to update director\nerror: ' + error.message);
    }
  }
);

router.delete(
  '/:id',
  validateParamId(),
  passport.authenticate('bearer', { session: false }),
  checkRole(UserRoles.admin),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      await deleteDirector(req.params.id);
      return res.status(200).send('Director deleted');
    } catch (error) {
      return res
        .status(500)
        .send('failed to delete director\nerror: ' + error.message);
    }
  }
);

router.get('/:id/countMovies', validateParamId(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const counter = await countMoviesByDirector(req.params.id);
    return res.status(200).json(counter);
  } catch (error) {
    return res
      .status(500)
      .send('failed to count director movies\nerror: ' + error.message);
  }
});

module.exports = router;
