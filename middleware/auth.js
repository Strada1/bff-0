import {checkAuthUser} from '../helpers/users.js'

const auth = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
    if (!authorization) {
      return res.status(401).send('specify authorization parameters')
    }

    const [email, password] = authorization.split(' ')
    const isAuth = await checkAuthUser(email, password)
    if (!isAuth) {
      return res.status(401).send("you aren't authorized")
    }

    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).send('bad request')
  }
}

export default auth
