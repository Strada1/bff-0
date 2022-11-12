import express from 'express'
import mongoose from 'mongoose'
import URL from './urls.json'

mongoose.connect(URL.DATA_BASE)

export const app = express()
app.use(express.json())

const ROUTES = URL.ROUTES

app.get(ROUTES.BASE, (req, res) => {
    res.send('Hello World')
})

app.listen(URL.PORT, () => {
    console.log(`Example listening on port ${URL.PORT}`)
})

require('./routes')