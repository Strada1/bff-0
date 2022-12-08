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

const getUserByEmail = email => {
  return Users.findOne({email}).lean()
}

const getFavorites = async () => {
  const countFavorites = await Users.aggregate([
    {
      $unwind: '$favorites'
    },
    {
      $lookup: {
        from: 'movies',
        localField: 'favorites',
        foreignField: '_id',
        as: 'favorite'
      }
    },
    {
      $unwind: '$favorite'
    },
    {
      $project: {
        favorite: true
      }
    },
    {
      $group: {_id: '$favorite', count: {$count: {}}}
    },
    {
      $project: {
        title: '$_id.title',
        count: true,
        _id: 0
      }
    }
  ])
  const obj = {}
  countFavorites.forEach(item => (obj[item.title] = item.count))
  return obj
}

const checkAuthUser = token => {
  return Users.findOne({token})
}

const findUserAndAddToFavorite = (token, movieId) => {
  return Users.findOneAndUpdate(
    {token},
    {$addToSet: {favorites: movieId}},
    {new: true}
  )
}

const findUserAndDeleteFromFavorite = (token, movieId) => {
  return Users.findOneAndUpdate(
    {token},
    {$pull: {favorites: movieId}},
    {new: true}
  )
}

const updateUser = (userId, payload) => {
  return Users.findByIdAndUpdate(userId, payload)
}

const deleteUser = userId => {
  return Users.findByIdAndRemove(userId)
}

export {
  createUser,
  getUsers,
  getUser,
  getUserByEmail,
  getFavorites,
  checkAuthUser,
  findUserAndAddToFavorite,
  findUserAndDeleteFromFavorite,
  updateUser,
  deleteUser
}
