import { app } from '../..'
import { ROUTES } from '../../urls.json'
import { Categories } from '../../../models'

app.post(ROUTES.CATEGORIES, (req, res) => {
    try {
        Categories.create(req.body)
    } catch (error) {
        res.status(500).send(error)

        return
    }

    return res.status(201).send('category created!')
})