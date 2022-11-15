import { app } from '../..'
import { ROUTES } from '../../urls.json'
import { Movie } from '../../../models'

app.post(ROUTES.MOVIES, async (req, res) => {
    try {
        Movie.create(req.body)
    } catch (error) {
        res.status(500).send(error)

        return
    }

    return res.status(201).send('movie created!')
})