require('dotenv').config()
const express = require('express')
const cors = require('cors')
const useRoutes = require('./routes')
const app = express()
const port = process.env.PORT

const allowedOrigins = [
    `http://localhost:${port}`,
]

app.use(
    cors({
        origin: allowedOrigins
    })
)

app.use(express.json())

useRoutes(app)

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
})
