const url = 'mongodb://localhost:27017/main';
const mongoose = require('mongoose');
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = mongoose
