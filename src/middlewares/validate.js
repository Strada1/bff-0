const validate =
  (fields = []) =>
    (req, res, next) => {
      const errors = [];
      fields.forEach((field) => {
        const value = req.body[field];
        if (!value && value != false) {
          errors.push(
            `Validation failed because - ${field} value is "${req.field}"`
          );
        }
      });
      if (errors.length) {
        return res.status(400).send('Bad request:\n' + errors.join('\n'));
      }
      next();
    };

module.exports = validate;
