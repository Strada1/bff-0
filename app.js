import express from 'express'
const app = express()
const port = 3000
import root from './routes/index.js'
import moviesRoutes from './routes/movies.js'
import categoriesRoutes from './routes/categories.js'

app.use(express.json())
app.use('/', root)
app.use('/movies', moviesRoutes)
app.use('/categories', categoriesRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
