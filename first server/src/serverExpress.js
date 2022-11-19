const express = require('express')
const app = express()
const port = process.env.PORT
require('./db')
const cors = require('cors')

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
})

const allowedOrigins = [
    `http://localhost:${port}`
];

app.use(cors({
    origin: allowedOrigins
}), express.json())

module.exports = app