import mongoose from 'mongoose'
import { app } from '../..'
import { ROUTES } from '../../urls.json'
import * as schemas from '../../../schemas'

app.post(ROUTES.MOVIES, async (req, res) => {
    console.log('post')
    try {
        const Movie = mongoose.model('Movie', schemas.Movies)
        Movie.create(req.body)
    } catch (error) {
        res.status(400).send(error)

        return
    }

    return res.status(201).send('movie created!')
})