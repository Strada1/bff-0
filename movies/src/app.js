const express = require('express')
const cors = require('cors')
const useRoutes = require('./routes')
const app = express()
const port = 8080

const allowedOrigins = [
    'http://localhost:8080/movies',
    'http://localhost:8080/categories',
    'http://localhost:8080/comments',
]

app.use(
    cors({
        origin: allowedOrigins,
    })
)

app.use(express.json())

useRoutes(app)

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
})
