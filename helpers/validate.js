import {body} from 'express-validator'

const validate = arr => {
  return arr.map(item => body(item, `${item} is empty`).not().isEmpty())
}

const validateObj = (obj, arrKeys) => {
  return arrKeys.every(key => {
    const titleIsNotString =
      key === 'title' && (typeof obj[key] !== 'string' || obj[key] === '')
    const isNotNumber =
      (key === 'year' || key === 'rating' || key === 'duration') &&
      typeof obj[key] !== 'number'
    const commetsIsNotObject =
      key === 'comments' && typeof obj[key] !== 'object'
    const IdisNotValid =
      (key === 'category' || key === 'director') &&
      (typeof obj[key] !== 'string' || obj[key].length !== 24)

    if (titleIsNotString || isNotNumber || commetsIsNotObject || IdisNotValid) {
      return false
    }
    return true
  })
}

const validateUser = () => {
  return [
    body('email').isEmail(),
    body(
      'password',
      'password length must be between 5 and 20 characters'
    ).isLength({min: 5, max: 20})
  ]
}

export {validate, validateObj, validateUser}
