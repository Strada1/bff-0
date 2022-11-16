import express from 'express'
import cors from 'cors'
import root from './routes/index.js'
import moviesRoutes from './routes/movies.js'
import categoriesRoutes from './routes/categories.js'

const app = express()
const port = 3000
const allowedOrigins = ['http://localhost:3000']

app.use(
  cors({
    origin: allowedOrigins
  }),
  express.json()
)
app.use('/', root)
app.use('/movies', moviesRoutes)
app.use('/categories', categoriesRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
