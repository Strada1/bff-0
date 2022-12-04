const NodeCache = require('node-cache');

const moviesCache = new NodeCache({ stdTTL: 60 * 10 });

class MovieCacheService {
  key = 'movies-list';
  has = () => {
    return moviesCache.has(this.key);
  };
  get = () => {
    return moviesCache.get(this.key);
  };
  set = ( data ) => {
    moviesCache.set(this.key, data);
  };
}

const movieCacheService = new MovieCacheService();

const moviesCacheMiddleware = ( req, res, next ) => {
  try {
    if (movieCacheService.has()) {
      const movies = movieCacheService.get();
      return res.status(200).send(movies);
    }

    return next();
  } catch (error) {
    console.log(error);
    throw error;
  }
};


module.exports = {
  moviesCacheMiddleware,
  movieCacheService,
};
