const app = require("../serverExpress");
const {
    createComment,
    findComments,
    findByIdAndUpdateComment,
    deleteComment
} = require("../services/commentsService");

app.route('/movies/comments')
    .post(async (req, res) => {
        try {
            await createComment(req.body)
            return res.status(200).send('comment created')
        } catch (err) {
            return res.status(500)
        }
    })
    .get(async (req, res) => {
        try {
            const comments = await findComments(req.body.id)
            return res.status(200).send(comments)
        } catch (err) {
            return res.status(500).send(`bad request, code: ${err.code}`)
        }
    })
    .put(async (req, res) => {
        try {
            await findByIdAndUpdateComment(req.body.id, req.body)
            return res.status(200).send('comment updated')
        } catch (err) {
            return res.status(500).send(`bad request, code: ${err.code}`)
        }
    })
    .delete(async (req, res) => {
        try {
            await deleteComment(req.body.id)
            return res.status(200).send('comment deleted')
        } catch (err) {
            return res.status(500).send(`bad request, code: ${err.code}`)
        }
    })