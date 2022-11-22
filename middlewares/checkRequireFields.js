const checkRequiredFields = (fields) => {
  return (req, res, next) => {
    const requireFields = [];
    fields.forEach((item) => {
      if (!req.body[item]) {
        requireFields.push(item);
      }
    });
    if (!requireFields.length) {
      next();
    } else {
      return res
        .status(402)
        .send({ message: "Fields required!", fields: requireFields });
    }
  };
};

module.exports = { checkRequiredFields };
