const url = 'mongodb://127.0.0.1:27017/main'
const mongoose = require('mongoose')
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

module.exports = mongoose