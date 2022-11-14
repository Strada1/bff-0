const url = 'mongodb://localhost:27017/main'
// import mongoose from 'mongoose'
// console.log(mongoose)
// const {Schema} = mongoose
import db, {connect} from 'mongoose'
connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

export default db
