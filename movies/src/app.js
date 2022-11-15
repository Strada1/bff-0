const express = require('express')
const cors = require('cors')
const index = require('./routes/index')
const movies = require('./routes/movies')
const categories = require('./routes/categories')
const app = express()
const port = 8080

const allowedOrigins = [
    'http://localhost:8080/movies',
    'http://localhost:8080/categories',
]

app.use(
    cors({
        origin: allowedOrigins,
    })
)

app.use(express.json())

app.use('/', index)
app.use('/movies', movies)
app.use('/categories', categories)

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
})
