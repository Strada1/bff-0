const mongoose = require('mongoose');

class DataBase {
    url = 'mongodb://localhost:27017/main';

    connectedDb() {
        mongoose.connect(this.url, {useNewUrlParser: true, useUnifiedTopology: true});
    }

    movieSchema = new mongoose.Schema({
        title: String,
        year: Number,
        rating: Number,
    });

    movie() {
        return mongoose.model('Movie', this.movieSchema);
    }
}

module.exports.DataBase = DataBase;