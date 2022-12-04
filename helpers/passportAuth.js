const passport = require("passport");
const BearerStrategy = require('passport-http-bearer');
const {getUsers} = require("../services/userService");

passport.use(
    new BearerStrategy(
        async function(token, done) {
            const [user] = await getUsers({ token });
            try {
                if (user) {
                    return done(null, user)
                }
                return done(null, false)
            } catch (e) {
                if (e) {
                    return done(e, false)
                }
            }
        }
    ));

const passportAuth = (req, res, next) => {
    passport.authenticate('bearer', {session: false}, (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).send('Unauthorized');
        }
        next()
    })(req, res, next)
}

const passportRole = (role) => (req, res, next) => {
    passport.authenticate('bearer', {session: false}, (err, user) => {
        if (err) {
            return next(err)
        }
        const hasRole = user.roles.includes(role);
        if (!hasRole) {
            return res.status(403).send('Forbidden');
        }
        next()
    })(req, res, next)
}

module.exports = {
    passportAuth, passportRole
};