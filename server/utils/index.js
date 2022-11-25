export function validate(fields) {
  return (req, res, next) => {
    const arr = fields.filter(field => !(field in req.body));

    if (arr.length > 0) {
      return res.status(400).send(`fields not passed: ${arr.join(', ')}`);
    } else {
      next();
    }
  }
}