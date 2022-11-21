const express = require('express')
const {
    getComments,
    createComment,
    deleteComment,
    updateComment
} = require('../services/commentService')
const { validate } = require('../middlewares')

const router = express.Router()

router.get('/:movieId', async (req, res) => {
    try {
        const { movieId } = req.params
        const comments = await getComments(movieId)
        return res.status(200).send(comments)
    } catch (e) {
        return res.status(500).send('can not get comments')
    }
})

router.post('/:movieId', validate(['text', 'author']), async (req, res) => {
    try {
        const { movieId } = req.params
        const comment = await createComment({ ...req.body, movie: movieId })
        return res.status(201).send(`comment added successfully: ${comment}`)
    } catch (e) {
        return res.status(500).send('can not add comment')
    }
})

router.delete('/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params
        const comment = await deleteComment(commentId)
        return res.status(200).send(`comment successfully deleted: ${comment}`)
    } catch (e) {
        return res.status(500).send('can not delete comment')
    }
})

router.patch('/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params
        const comment = await updateComment(commentId, req.body)
        return res.status(200).send(`successfully updated: ${comment}`)
    } catch (e) {
        return res.status(500).send('can not update comment')
    }
})

module.exports = router
