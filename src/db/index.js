const mongoose = require('mongoose');

const connected = (url) => {
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
}

module.exports = {connected};