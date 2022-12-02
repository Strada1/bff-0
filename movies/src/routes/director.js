const express = require('express');
const {
  getDirectors,
  createDirector,
  deleteDirector,
  updateDirector
} = require('../services/directorService');
const { validate, checkIsAdmin } = require('../middlewares');
const { validationResult, body, param } = require('express-validator');
const passport = require('passport');

const router = express.Router();

const fieldValidators = [
  body('fullName').matches(/[a-zA-Zа-яА-Я]/).optional().withMessage('fullName must contain only letters')
];

const paramValidator = param('directorId').isMongoId().withMessage('directorId must be MongoId');

router.get('/directors', async (req, res) => {
  try {
    const directors = await getDirectors();
    return res.status(200).send(directors);
  } catch (e) {
    return res.status(500).send('can not get directors');
  }
});

router.post('/directors',
  passport.authenticate('bearer', { session: false }),
  validate(['fullName']),
  ...fieldValidators,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const director = await createDirector(req.body);
      return res.status(201).send(`successfully created: ${director}`);
    } catch (e) {
      console.log(e);
      return res.status(500).send('can not create director');
    }
  });

router.delete('/directors/:directorId',
  passport.authenticate('bearer', { session: false }),
  checkIsAdmin,
  paramValidator,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const director = await deleteDirector(req.params.directorId);
      return res.status(200).send(`successfully deleted: ${director}`);
    } catch (e) {
      return res.status(500).send('can not delete movie');
    }
  });

router.patch('/directors/:directorId',
  passport.authenticate('bearer', { session: false }),
  paramValidator,
  ...fieldValidators,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const { directorId } = req.params;
      const director = await updateDirector(directorId, req.body);
      return res.status(200).send(`successfully updated: ${director}`);
    } catch (e) {
      return res.status(500).send('can not patch director');
    }
  });

module.exports = router;
