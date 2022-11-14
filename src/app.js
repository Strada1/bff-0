const express = require('express');
const {Routes} = require('./routes');

class Server extends Routes{
    port = 3000;
    app = express();

    run() {
        this.connectedDb();
        this.app.use(express.json());

        this.home();
        this.getMovies();
        this.createMovie();

        this.app.listen(this.port, () => {
            console.log(`server run in ${this.port} port`)
        })
    }
}

const server = new Server();

module.exports.server = server;