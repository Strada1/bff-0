const validate = (requiredFields) => {
  return (req, res, next) => {
    let isValid = true;
    const missingFields = [];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        isValid = false;
        missingFields.push(field);
      }
    }
    if (!isValid) {
      return res.status(400).send(`Validation is failed, missing required fields: ${missingFields}`);
    }
    next();
  };
};

module.exports = { validate };