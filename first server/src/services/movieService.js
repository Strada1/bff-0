const {Movie} = require("../schemas");

function createMovie(options) {
    return Movie.create(options)
}
function findOneMovie(title) {
    return Movie.findOne({title: title}).populate('category director').lean()
}
function findByIdAndDeleteMovie(id) {
    return Movie.findByIdAndDelete(id).lean()
}

function findByIdAndUpdateMovie(id, options) {
    return Movie.findByIdAndUpdate(id, options).lean()
}

module.exports = {createMovie, findOneMovie, findByIdAndDeleteMovie, findByIdAndUpdateMovie}