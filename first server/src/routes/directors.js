const app = require("../serverExpress");
const {
    createDirector,
    findByIdAndUpdateDirector,
    deleteDirector,
    findAllDirectors
} = require("../services/directorService");

app.route('/directors')
    .post(async (req, res) => {
        try {
            await createDirector(req.body)
            return res.status(200).send('director created')
        } catch (err) {
            return res.status(500)
        }
    })
    .get(async (req, res) => {
        try {
            const directors = await findAllDirectors(req.body.id)
            return res.status(200).send(directors)
        } catch (err) {
            return res.status(500).send(`bad request, code: ${err.code}`)
        }
    })
    .put(async (req, res) => {
        try {
            await findByIdAndUpdateDirector(req.body.id, req.body)
            return res.status(200).send('director updated')
        } catch (err) {
            return res.status(500).send(`bad request, code: ${err.code}`)
        }
    })
    .delete(async (req, res) => {
        try {
            await deleteDirector(req.body.id)
            return res.status(200).send('director deleted')
        } catch (err) {
            return res.status(500).send(`bad request, code: ${err.code}`)
        }
    })