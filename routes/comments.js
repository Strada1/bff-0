import express from 'express'
import {findMovie} from '../helpers/movies.js'
import {
  createComment,
  deleteComment,
  getComments,
  updateComments
} from '../helpers/comments.js'

const router = express.Router()

router
  .post('/:id', async (req, res, next) => {
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
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const movie = await findMovie(id)
      if (!movie) {
        return res.status(404).send('comments not found')
      }
      const arrComments = movie.comments
      const comments = await getComments(arrComments)
      return res.status(201).send(comments)
    } catch (error) {
      return next(error)
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const comment = await updateComments(id, req.body)
      if (!comment) {
        return res.status(404).send('comment not found')
      }
      return res.status(201).send('comment changed')
    } catch (error) {
      return next(error)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const comment = await deleteComment(id)
      if (!comment) {
        return res.status(404).send('comment not found')
      }
      return res.status(201).send('comment deleted')
    } catch (error) {
      return next(error)
    }
  })

export default router
