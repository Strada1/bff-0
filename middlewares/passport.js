const passport = require("passport");
const BearerStrategy = require('passport-http-bearer');
const {getByTokenUserService} = require("../service/userService");

passport.use(
    new BearerStrategy(
        async function(token, done) {
            const user = await getByTokenUserService(token);
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

const authorization = (roles = []) => (req, res, next) => {
    passport.authenticate('bearer', {session: false}, (err, user) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            return res.status(401).send('Unauthorized');
        }

        const hasRoles = roles.length !== 0;
        if (hasRoles) {
            const hasNotRolesUsers = (roles.filter(role => user.roles.includes(role))).length === 0
            if (hasNotRolesUsers) {
                return res.status(403).send('Forbidden');
            }
        }
        next();
    })(req, res, next)
}

module.exports = {
    passport, authorization
};