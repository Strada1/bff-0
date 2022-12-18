require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const User = require('models/User');
const app = express();
const port = process.env.PORT
const chats = require('routes/chats')
const messages = require('routes/messages')
const users = require('routes/users')

const allowedOrigins = [
    `http://localhost:${port}`
];

app.use(
    cors({
        origin: allowedOrigins
    })
);

app.use(express.json());

passport.use(new BearerStrategy(
    function(token, done) {
        User.findOne({ token: token }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            return done(null, user, { scope: 'all' });
        });
    }
));

app.get('/', (req, res) => {
    try {
        return res.status(200).send('Chats');
    } catch (err) {
        return res.status(500).send(err.message);
    }
});
app.use(chats, messages, users);

module.exports = app.listen(port, async () => {
    console.log(`app listening on port ${port}`);
});