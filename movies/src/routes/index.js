const movies = require('./movie')
const categories = require('./category')
const comments = require('./comment')
const directors = require('./director')
const test = require('./test')

function useRoutes(app) {
    app.get('/', (req, res) => {
        try {
            return res.status(200).send('Movies')
        } catch (err) {
            return res.status(500).send(err.message)
        }
    })
    app.use(movies, categories, comments, directors, test)
}

module.exports = useRoutes
