const {DataBase} = require('./dataBase');

class Routes extends DataBase {
    home() {
        this.app.get('/', (req, res) => {
            res.send('<h1>Home</h1>')
        })
    }

    getMovies() {
        this.app.get('/movies', (req, res) => {
            res.send('<h1>Movies</h1>')
        })
    }

    createMovie() {
        this.app.post('/movies', async (req, res) => {
            await this.movie().create(req.body);

            return res.status(201).send('movie created');
        });
    }
}

module.exports.Routes = Routes;