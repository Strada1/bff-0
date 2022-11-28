const { Router } = require('express');
const { validationResult } = require('express-validator');
const validate = require('../middlewares/validate');
const router = Router();

router.post(
  '/',
  validate(['email', 'username', 'password', 'roles']),
  (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    } catch (error) {
      res.status(500).send('failed to create movie\nerror: ' + error.message);
    }
  }
);

module.exports = router;
