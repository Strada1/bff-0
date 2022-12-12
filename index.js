import express from 'express'
import cors from 'cors'
import root from './routes/index.js'

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

app.listen(port, () => {
  console.log(`server is working! http://${domain}:${port}`)
})

export default app
