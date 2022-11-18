const movies = require('./movie')
const categories = require('./category')
const comments = require('./comment')
const directors = require('./director')

function useRoutes(app) {
    app.get('/', (req, res) => {
        try {
            return res.status(200).send('Movies')
        } catch (err) {
            return res.status(500).send(err.message)
        }
    })
    app.use('/movies', movies)
    app.use('/categories', categories)
    app.use('/comments', comments)
    app.use('/directors', directors)
}

module.exports = useRoutes
