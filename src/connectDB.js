const {DB_URL} = require('./config')
const mongoose = require('mongoose');

mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}); 

module.exports = mongoose;