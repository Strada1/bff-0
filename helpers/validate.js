import {body} from 'express-validator'

const validate = arr => {
  return arr.map(item => body(item, `${item} is empty`).not().isEmpty())
}

export default validate
