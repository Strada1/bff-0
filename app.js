import express from 'express'
import cors from 'cors'
import root from './routes/index.js'
import moviesRoutes from './routes/movies.js'
import categoriesRoutes from './routes/categories.js'
import commentsRoutes from './routes/comments.js'
import directorsRoutes from './routes/directors.js'
import usersRoutes from './routes/users.js'
import authMiddleware from './middleware/auth.js'

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

app.use('/movies', authMiddleware, moviesRoutes)
app.use('/categories', authMiddleware, categoriesRoutes)
app.use('/comments', authMiddleware, commentsRoutes)
app.use('/directors', authMiddleware, directorsRoutes)
app.use('/users', usersRoutes)
app.use('/', authMiddleware, root)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('bad request')
})

app.listen(port, () => {
  console.log(`server is working! http://${domain}:${port}`)
})
