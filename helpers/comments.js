import Comments from '../models/comments.js'

const createComment = payload => {
  return Comments.create(payload)
}

const getComments = array => {
  const ids = array.map(i => i.toString())
  return Comments.find({_id: {$in: ids}}).lean()
}

const updateComments = (id, payload) => {
  return Comments.findByIdAndUpdate(id, payload)
}

const deleteComment = id => {
  return Comments.findByIdAndDelete(id)
}

const deleteAllComments = comments => {
  return comments.forEach(async item => {
    item = item.toString()
    await Comments.findByIdAndDelete(item)
  })
}

export {
  getComments,
  updateComments,
  deleteComment,
  deleteAllComments,
  createComment
}
