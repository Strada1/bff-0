const NodeCache = require("node-cache");
const {getMovies} = require("../services/movieService");
const myCache = new NodeCache();

const setMoviesCache = async () => {
    const movies = await getMovies();
    myCache.set('movies', movies, 100000);
}

const getMoviesCache = () => {
    return myCache.get('movies');
}

module.exports = {
    getMoviesCache, setMoviesCache
}