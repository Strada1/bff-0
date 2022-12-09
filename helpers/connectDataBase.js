const mongoose = require('mongoose');

async function connectDataBase(URL) {
    try {
        await mongoose.connect(URL, {useNewUrlParser: true, useUnifiedTopology: true});
        // console.log('connect to DB');
    } catch (e) {
        console.log(e);
    }
}


module.exports = connectDataBase;