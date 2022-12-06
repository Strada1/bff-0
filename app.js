import express from 'express'
import cors from 'cors'
import root from './routes/index.js'
import moviesRoutes from './routes/movies.js'
import categoriesRoutes from './routes/categories.js'
import commentsRoutes from './routes/comments.js'
import directorsRoutes from './routes/directors.js'
import usersRoutes from './routes/users.js'
import passport from './middleware/passport.js'

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

app.use('/movies', moviesRoutes)
app.use('/movies', passport(), moviesRoutes)
app.use('/categories', passport(), categoriesRoutes)
app.use('/comments', passport(), commentsRoutes)
app.use('/directors', passport(), directorsRoutes)
app.use('/users', usersRoutes)
app.use('/', passport(), root)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(400).send('bad request')
})

app.listen(port, () => {
  console.log(`server is working! http://${domain}:${port}`)
})

export default app
