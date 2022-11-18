import Director from '../models/director.js'

const createDirector = payload => {
  return Director.create(payload)
}

const getAllDirector = () => {
  return Director.find().lean()
}

const updateDirector = (id, payload) => {
  return Director.findByIdAndUpdate(id, payload)
}

const deleteDirector = id => {
  return Director.findByIdAndDelete(id)
}

export {createDirector, getAllDirector, updateDirector, deleteDirector}
