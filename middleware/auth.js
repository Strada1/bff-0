import {checkAuthUser} from '../helpers/users.js'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).send('no token in the headers')
    }

    const isAuth = await checkAuthUser(token)
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
