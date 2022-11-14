const express = require('express')
const app = express()
const port = 8080
const url = 'mongodb://localhost:27017/main'
const mongoose = require('mongoose')
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const MovieSchema = new mongoose.Schema(
    {
        title: String,
        year: Number,
        duration: Number,
    },
    {
        versionKey: false,
    }
)
const Movie = mongoose.model('Movie', MovieSchema)

const CategorySchema = new mongoose.Schema(
    {
        category: String,
    },
    {
        versionKey: false,
    }
)
const Category = mongoose.model('Category', CategorySchema)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/movies', async (req, res) => {
    try {
        const response = await Movie.collection.find().toArray()
        return res.status(200).send(response)
    } catch (e) {
        console.log(e)
        return res.status(500).send('bad request')
    }
})

app.post('/movies', async (req, res) => {
    try {
        const movie = await Movie.create(req.body)
        return res.status(201).send(movie)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not create movie')
    }
})

app.get('/categories', async (req, res) => {
    try {
        const response = await Category.collection.find().toArray()
        return res.status(200).send(response)
    } catch (e) {
        console.log(e)
        return res.status(500).send('bad request')
    }
})

app.post('/categories', async (req, res) => {
    try {
        const category = await Category.create(req.body)
        return res.status(201).send(category)
    } catch (e) {
        console.log(e)
        return res.status(500).send('can not create category')
    }
})

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
})
