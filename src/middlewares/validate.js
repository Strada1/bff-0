const { body } = require('express-validator');

// TODO: придумать как выплевывать ошибку в response прямо отсюда
const validate = (fields) => {
  return fields.map((field) =>
    body(field, 'required field are missing').not().isEmpty()
  );
};

module.exports.validate = validate;
