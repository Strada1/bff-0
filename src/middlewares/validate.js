const validate = (fields) => {
  return (request, response, next) => {
    const emptyFields = fields.filter((field) => {
      if (!request.body.hasOwnProperty(field)) {
        return true;
      }
    });

    if (emptyFields.length > 0) {
      const inflection = emptyFields.length === 1 ? '' : 's';

      return response.status(400).send({
        error: `required field${inflection} are missing: ${emptyFields.join(
          ', '
        )}`,
      });
    }

    next();
  };
};

module.exports.validate = validate;
