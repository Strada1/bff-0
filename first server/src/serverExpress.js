const express = require('express')
const app = express()
const port = 3000
require('./db')
const cors = require('cors')

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
})

const allowedOrigins = [
    'http://localhost:3000'
];

app.use(cors({
    origin: allowedOrigins
}), express.json())

module.exports = app