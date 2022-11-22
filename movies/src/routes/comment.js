const express = require('express')
const {
    getComments,
    createComment,
    deleteComment,
    updateComment
} = require('../services/commentService')
const { validate } = require('../middlewares')
const { validationResult, body, param } = require('express-validator')
const { addCommentToMovie, deleteCommentFromMovie } = require('../services/movieService')

const router = express.Router()

const fieldValidators = [
    body('author').matches(/[a-zA-Zа-яА-Я]/).optional().withMessage('author must contain only letters')
]

const paramValidator = param('commentId').isMongoId().optional().withMessage('commentId must be MongoId')

router.get('/comments', async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const { movieId } = req.query
        const comments = await getComments(movieId)
        return res.status(200).send(comments)
    } catch (e) {
        return res.status(500).send('can not get comments')
    }
})

router.post('/comments', validate(['text', 'author']), ...fieldValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const { movieId } = req.query
        const comment = await createComment({ ...req.body, movie: movieId })
        await addCommentToMovie(movieId, comment._id)
        return res.status(201).send(`comment added successfully: ${comment}`)
    } catch (e) {
        return res.status(500).send('can not add comment')
    }
})

router.delete('/comments/:commentId', paramValidator, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const { commentId } = req.params
        const comment = await deleteComment(commentId)
        await deleteCommentFromMovie(comment.movie, commentId)
        return res.status(200).send(`comment successfully deleted`)
    } catch (e) {
        return res.status(500).send('can not delete comment')
    }
})

router.patch('/comments/:commentId', paramValidator, ...fieldValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const { commentId } = req.params
        const comment = await updateComment(commentId, req.body)
        return res.status(200).send(`successfully updated: ${comment}`)
    } catch (e) {
        return res.status(500).send('can not update comment')
    }
})

module.exports = router
