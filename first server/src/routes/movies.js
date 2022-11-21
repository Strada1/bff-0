const app = require("../serverExpress");
const {
    createMovie,
    findByIdAndDeleteMovie,
    findByIdAndUpdateMovie,
    findOneMovie
} = require("../services/movieService");
const {validate} = require("../middlewares/validate");

app.route('/movies')
    .post(validate(['title', 'director']), async (req, res) => {
        try {
            await createMovie(req.body)
            return res.status(201).send('movie created')
        } catch (err) {
            return res.status(500).send(`bad request, code: ${err.code}`)
        }
    })
    .get(async (req, res) => {
        try {
            const movie = await findOneMovie(req.body.title)
            return res.status(200).send(movie)
        } catch (err) {
            return res.status(500).send(`bad request, code: ${err.code}`)
        }
    })
    .put(async (req, res) => {
        try {
            await findByIdAndUpdateMovie(req.body.id, req.body)
            return res.status(200).send('movie changed')
        } catch (err) {
            return res.status(500)
        }
    })
    .delete(async (req, res) => {
        try {
            await findByIdAndDeleteMovie(req.body.id)
            return res.status(200).send('movie deleted')
        } catch (err) {
            return res.status(500)
        }
    })
