const { Movie, Comment } = require('../models');
const { ObjectId } = require('mongodb');
const { movieCacheService } = require('./cache/movie');

const applyFiltersAndSort = ( query, filters = {}, sort = {} ) => {
  Object.entries(filters).forEach(filter => {
    if (filter[1]) {
      query.where(filter[0], filter[1]);
    }
  });

  Object.entries(sort).forEach(sort => {
    if (sort[1]) {
      query.sort({ [sort[0]]: sort[1] });
    }
  });
};

class Service {
  create = ( { title, category, year, duration, director } ) => {
    return Movie.create({ title, category, year, duration, director });
  };
  createFromJSON = async ( fileJSON ) => {
    return Movie.create(fileJSON);
  };
  get = async ( { filters = {}, sort = {} } ) => {
    const query = Movie.find().populate([
      { path: 'comments' },
      {
        path: 'category',
        transform: ( doc ) => doc === null ? null : doc.title,
      },
      {
        path: 'director',
        transform: ( doc ) => doc === null ? null : `${doc.name} ${doc.surname}`,
      },
    ]);

    const hasNoFilters = !filters || Object.keys(filters).length === 0;
    const hasNoSort = !sort || Object.keys(sort).length === 0;

    if (hasNoFilters && hasNoSort) {
      const movies = await query.exec();
      movieCacheService.set(movies);
      return movies;
    }

    applyFiltersAndSort(query, filters, sort);
    return query;
  };
  getOne = ( movieId ) => {
    return Movie.findById(movieId).populate('comments');
  };
  getDirectorMoviesCount = ( directorId ) => {
    return Movie.aggregate([
      { $match: { director: new ObjectId(directorId) } },
      { $count: 'count' },
    ]);
  };
  getBetween1999And2010 = () => {
    return Movie.aggregate([
      { $match: { year: { $gt: 1999, $lt: 2010 } } },
    ]);
  };
  update = ( movieId, { title, category, year, duration, director } ) => {
    return Movie.findByIdAndUpdate(
      movieId,
      { title, category, year, duration, director },
      { new: true },
    );
  };
  delete = ( movieId ) => {
    return Movie.findByIdAndDelete(movieId);
  };
  addComment = async ( movieId, { text } ) => {
    const comment = await Comment.create({ movie: movieId, text });
    return Movie.findByIdAndUpdate(
      movieId,
      { $push: { comments: comment._id } },
      { new: true },
    );
  };
  updateComment = ( commentId, { text } ) => {
    return Comment.findByIdAndUpdate(
      commentId,
      { text },
    );
  };
  deleteComment = async ( movieId, commentId ) => {
    const comment = await Comment.findByIdAndDelete(commentId);
    return Movie.findByIdAndUpdate(
      movieId,
      { $pull: { comments: comment._id } },
      { new: true },
    );
  };
}

const movieService = new Service();

module.exports = { movieService };
