import express from 'express'
import cors from 'cors'
import root from './routes/index.js'
import moviesRoutes from './routes/movies.js'
import categoriesRoutes from './routes/categories.js'
import commentsRoutes from './routes/comments.js'
import directorsRoutes from './routes/directors.js'
import fs from 'node:fs/promises'
import {createMovie} from './helpers/movies.js'

try {
  const file = await fs.readFile('movies.json', {encoding: 'utf-8'})
  const fileAfterParse = JSON.parse(file)
  fileAfterParse.forEach(i => {
    const hasProps =
      i['title'] &&
      i['year'] &&
      i['rating'] &&
      i['category'] &&
      i['duration'] &&
      i['director'] &&
      i['comments']
    if (hasProps) createMovie(i)
  })
} catch (error) {
  console.log(error)
}

const app = express()
const port = process.env.PORT || 3000
const domain = process.env.DOMAIN
const allowedOrigins = [`http://${domain}:${port}`]

app.use(
  cors({
    origin: allowedOrigins
  }),
  express.json()
)
app.use('/', root)
app.use('/movies', moviesRoutes)
app.use('/categories', categoriesRoutes)
app.use('/comments', commentsRoutes)
app.use('/directors', directorsRoutes)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('bad request')
})

app.listen(port, () => {
  console.log(`server is working! http://${domain}:${port}`)
})
