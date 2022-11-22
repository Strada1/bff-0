const express = require('express')
const {
    getComments,
    createComment,
    deleteComment,
    updateComment
} = require('../services/commentService')
const { validate } = require('../middlewares')
const { validationResult, body, param } = require('express-validator')

const router = express.Router()

const fieldValidators = [
    body('author').matches(/[a-zA-Zа-яА-Я]/).optional().withMessage('author must contain only letters')
]

const paramValidators = [
    param('movieId').isMongoId().optional().withMessage('movieId must be MongoId'),
    param('commentId').isMongoId().optional().withMessage('commentId must be MongoId')
]

router.get('/:movieId', ...paramValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const { movieId } = req.params
        const comments = await getComments(movieId)
        return res.status(200).send(comments)
    } catch (e) {
        return res.status(500).send('can not get comments')
    }
})

router.post('/:movieId', validate(['text', 'author']), ...paramValidators, ...fieldValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const { movieId } = req.params
        const comment = await createComment({ ...req.body, movie: movieId })
        return res.status(201).send(`comment added successfully: ${comment}`)
    } catch (e) {
        return res.status(500).send('can not add comment')
    }
})

router.delete('/:commentId', ...paramValidators, async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() })
        }
        const { commentId } = req.params
        const comment = await deleteComment(commentId)
        return res.status(200).send(`comment successfully deleted: ${comment}`)
    } catch (e) {
        return res.status(500).send('can not delete comment')
    }
})

router.patch('/:commentId', ...paramValidators, ...fieldValidators, async (req, res) => {
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
