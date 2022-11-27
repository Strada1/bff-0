const Director = require('../models/DirectorSchema');

const createDirector = ({ name, firstname }) => {
    return Director.create({ name, firstname });
}

const getDirectors = () => {
    return Director.find();
}

const updateDirector = ({ id, ...updates }) => {
    return Director.findByIdAndUpdate(id, {...updates}, { new: true, rawResult: true });
}

const deleteDirector = (id) => {
    return Director.findByIdAndDelete(id);
}

module.exports = {
    createDirector, getDirectors, updateDirector, deleteDirector
}