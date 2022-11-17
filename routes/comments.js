import express from 'express'
import {findMovie, createComment} from '../helpers/services.js'
import Comments from '../models/comments.js'

const router = express.Router()

router.post('/:id', async (req, res, next) => {
  try {
    const id = req.params.id
    const movieComment = await findMovie(id)
    if (!movieComment) {
      return res.status(403).send('comment not added')
    }
    const commentData = await createComment(req.body)
    const commentId = commentData._id.toString()
    movieComment.comments.push(commentId)
    movieComment.save()
    res.status(201).send('added comment')
  } catch (error) {
    return next(error)
  }
})

export default router
