import passport from 'passport'
import BearerStrategy from 'passport-http-bearer'
import {checkAuthUser} from '../helpers/users.js'

const config = {session: false}

passport.use(
  new BearerStrategy(async (token, done) => {
    const user = await checkAuthUser(token)
    try {
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    } catch (error) {
      if (error) {
        return done(error, false)
      }
    }
  })
)

const passportBear = roles => (req, res, next) => {
  passport.authenticate('bearer', config, (err, user) => {
    if (err) {
      return next(err)
    }

    if (roles) {
      const hasAccess = roles.some(role => user.roles.includes(role))
      if (!hasAccess) {
        return res.status(403).send("you don't have access")
      }
    }

    if (!user) {
      return res
        .status(401)
        .send({success: false, error: 'authentication failed'})
    }
    next()
  })(req, res, next)
}

export default passportBear
