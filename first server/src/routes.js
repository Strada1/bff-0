const app = require('./serverExpress')
const {Category, Movie} = require('./db')

app.get('/', (req, res) => {
    res.send('its working!!!')
})

app.post('/movies', async (req, res) => {
    try {
        await Movie.create(req.body)
        return res.status(201).send('movie created')
    } catch (err) {
        return res.send(`bad request, code: ${err.code}`)
    }
})

app.post('/categories', async (req, res) => {
    try {
        await Category.create(req.body)
        return res.status(201).send('category created')
    } catch (err) {
        return res.send(`bad request, code: ${err.code}`)
    }
})
