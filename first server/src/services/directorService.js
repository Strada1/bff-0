const {Director} = require("../schemas");

function createDirector(options) {
    return Director.create(options)
}

function findAllDirectors() {
    return Director.find({}).lean()
}

function findByIdAndUpdateDirector(id, options) {
    return Director.findByIdAndUpdate(id, options).lean()
}

function deleteDirector(id) {
    return Director.findByIdAndDelete(id).lean()
}

module.exports = {createDirector, findAllDirectors, findByIdAndUpdateDirector, deleteDirector}