const {Movie} = require("../schemas");

function createMovie(options) {
    return Movie.create(options)
}
function findByIdAndDelete(id) {
    return Movie.findByIdAndDelete(id)
}

function findByIdAndUpdate(id, options) {
    return Movie.findByIdAndUpdate(id, options)
}

module.exports = {createMovie, findByIdAndDelete, findByIdAndUpdate}