const MovieModel = require("../scheme/movieScheme");

const createMovie = (body) => {
  const createdMovie = MovieModel.create(body);
  return createdMovie;
};

const updateMovie = (req) => {
  const updatedMovie = MovieModel.findByIdAndUpdate(req.params.id, req.body);
  return updatedMovie;
};

const findMovie = (params, method) => {
  const foundFilm = MovieModel[method](params);
  return foundFilm;
};

module.exports = {
  createMovie,
  updateMovie,
  findMovie,
  MovieModel,
};
