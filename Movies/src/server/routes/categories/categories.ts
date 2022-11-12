import mongoose from 'mongoose'
import { app } from '../..'
import { ROUTES } from '../../urls.json'
import * as schemas from '../../../schemas'

app.post(ROUTES.CATEGORIES, (req, res) => {
    try {
        const Categories = mongoose.model('Categories', schemas.Categories)
        Categories.create(req.body)
    } catch (error) {
        res.status(400).send(error)

        return
    }

    return res.status(201).send('category created!')
})