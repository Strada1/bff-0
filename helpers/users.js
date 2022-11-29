import Users from '../models/user.js'

const createUser = payload => {
  return Users.create(payload)
}

const getUsers = () => {
  return Users.find().lean()
}

const getUser = userId => {
  return Users.findById(userId).lean()
}

const checkAuthUser = (email, password) => {
  return Users.findOne({email, password})
}

const updateUser = (userId, payload) => {
  return Users.findByIdAndUpdate(userId, payload)
}

const deleteUser = userId => {
  return Users.findByIdAndRemove(userId)
}

export {createUser, getUsers, getUser, checkAuthUser, updateUser, deleteUser}
