import mongoose from 'mongoose'

const url = 'mongodb://localhost:27017/main'
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.error(error)
  }
}

connectDB()

export default mongoose
