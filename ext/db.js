import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const url = process.env.URL_DB
const blueColor = '\x1b[34m'
const redColor = '\x1b[31m'
const normalColor = '\x1b[0m'

try {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  console.log(blueColor, 'mongoose connected', normalColor)
} catch (error) {
  console.error(redColor, error, normalColor)
}

export default mongoose
