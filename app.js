const express = require('express')
const app = express()
const port = 3000
const root = require('./routes/index')
const moviesRoutes = require('./routes/movies')
const categoriesRoutes = require('./routes/categories')

app.use(express.json())
app.use('/', root)
app.use('/movies', moviesRoutes)
app.use('/categories', categoriesRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
