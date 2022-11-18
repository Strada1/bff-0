const MovieModel = require("../scheme/movieScheme");

const createMovie = async (body) => {
  const createdMovie = await MovieModel.create(body);
  return createdMovie;
};

const updateMovie = async (req) => {
  const updatedMovie = await MovieModel.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  return updatedMovie;
};

const findMovie = async (params, method) => {
  const foundFilm = await MovieModel[method](params);
  return foundFilm;
};

module.exports = { createMovie, updateMovie, findMovie, MovieModel };
