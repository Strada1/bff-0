const { ObjectId } = require("mongodb");
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

const getMovies = (filters, sort) => {
  const movies = MovieModel.find().populate("category director");

  if (filters.rating) {
    movies.where("rating", filters.rating);
  }

  if (filters.category) {
    movies.where("category", new ObjectId(filters.category));
  }

  if (filters.year) {
    movies.where("year", filters.year);
  }

  if (filters.title) {
    movies.where("title", filters.title);
  }

  switch (sort) {
    case "title":
      movies.sort({ title: "asc`" });
      break;
    case "year":
      movies.sort({ year: -1 });
      break;

    case "rating":
      movies.sort({ rating: 1 });
      break;
    default:
      break;
  }
  return movies;
};
module.exports = {
  createMovie,
  updateMovie,
  findMovie,
  MovieModel,
  getMovies,
};
