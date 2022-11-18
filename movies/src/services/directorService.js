const Director = require('../models/Director')

const getDirectors = () => {
    return Director.find()
}

const getDirector = (directorId) => {
    return Director.findById({ _id: directorId })
}

const createDirector = ({ fullName, birthday, movies }) => {
    return Director.create({ fullName, birthday: new Date(birthday), movies })
}

const updateDirector = (directorId, { fullName, birthday, movies }) => {
    return Director.findByIdAndUpdate(
        { _id: directorId },
        {
            fullName,
            birthday: new Date(birthday),
            movies,
        },
        { new: true }
    )
}

const deleteDirector = (directorId) => {
    return Director.findByIdAndDelete({ _id: directorId })
}

module.exports = {
    getDirectors,
    getDirector,
    createDirector,
    updateDirector,
    deleteDirector,
}
