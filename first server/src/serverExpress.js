const express = require('express')
const app = express()
const port = 3000

app.listen(port, async () => {
    console.log(`app listening on port ${port}`)
})

app.use(express.json())

module.exports = app