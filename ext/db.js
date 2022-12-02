import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const blueColor = '\x1b[34m'
const redColor = '\x1b[31m'
const url = process.env.URL_DB
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(blueColor, 'mongoose connected')
  } catch (error) {
    console.error(redColor, error)
  }
}

connectDB()

export default mongoose
