const app = require('./serverExpress')
const {createMovie, findByIdAndDelete, findByIdAndUpdate} = require('./services/movieService')
const {createComment} = require('./services/commentsService')
const {createCategory} = require('./services/categoryService')

app.get('/', (req, res) => {
    res.send('its working!!!')
})

app.route('/movies')
    .post(async (req, res) => {
        try {
            await createMovie(req.body)
            return res.status(201).send('movie created')
        } catch (err) {
            return res.send(`bad request, code: ${err.code}`)
        }
    })
    .delete(async (req, res) => {
        try {
            await findByIdAndDelete(req.body.id)
            return res.status(200).send('movie deleted')
        } catch (err) {
            return res.status(500)
        }
    })
    .put(async (req, res) => {
        try {
            await findByIdAndUpdate(req.body.id, req.body)
            return res.status(200).send('movie changed')
        } catch (err) {
            return res.status(500)
        }
    })

app.post('/movies/comments', async (req, res) => {
    try {
        await createComment(req.body)
        return res.status(200).send('newComment')
    } catch (err) {
        return res.status(500)
    }
})

app.post('/categories', async (req, res) => {
    try {
        await createCategory(req.body)
        return res.status(201).send('category created')
    } catch (err) {
        return res.send(`bad request, code: ${err.code}`)
    }
})
