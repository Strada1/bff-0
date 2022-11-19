import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config()

const url = process.env.URL_DB
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('mongoose connected')
  } catch (error) {
    console.error(error)
  }
}

connectDB()

export default mongoose
