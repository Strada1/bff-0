const express = require('express')
const index = require('./routes/index')
const movies = require('./routes/movies')
const categories = require('./routes/categories')
const app = express()
const port = 8080

app.use(express.json())

app.use('/', index)
app.use('/movies', movies)
app.use('/categories', categories)

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
})
