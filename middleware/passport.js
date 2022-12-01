import passport from 'passport'
import JwtStrategy from 'passport-jwt'
import ExtractJwt from 'passport-jwt'
import {getUserByIdForAuth} from '../helpers/users.js'

const options = {
  jwtFromRequest: ExtractJwt.ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET
}
const config = {session: false}

passport.use(
  new JwtStrategy.Strategy(options, async (jwt_payload, done) => {
    const user = await getUserByIdForAuth(jwt_payload)
    try {
      if (user) {
        return done(null, user)
      }
      return done(null, false)
    } catch (error) {
      if (error) {
        return done(err, false)
      }
    }
  })
)

const passportJWT = (req, res, next) => {
  passport.authenticate('jwt', config, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res
        .status(401)
        .send({success: false, error: 'authentication failed'})
    }

    next()
  })(req, res, next)
}

export default passportJWT
