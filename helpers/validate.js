const validate = arr => {
  return (req, res, next) => {
    const isValid = arr.every(item => req.body[item])
    if (!isValid) {
      return res.status(418).send('validation error')
    }
    return next()
  }
}

export default validate
