const MovieModel = require("../../scheme/movieScheme");
const Director = require("../../scheme/directorScheme");
const { ObjectId } = require("mongodb");

const getDirectorMoviesCount = (directorId) => {
  return Director.aggregate([
    {
      $match: {
        _id: new ObjectId(directorId),
      },
    },
    {
      $group: {
        _id: "$name",
        moviesCount: {
          $sum: {
            $size: "$movies",
          },
        },
      },
    },
  ]);
};

const getYearMoviesFind = (gt, lt) => {
  return MovieModel.aggregate([
    {
      $match: {
        year: {
          $gt: gt,
          $lt: lt,
        },
      },
    },
    {
      $count: "filmsPassedTest",
    },
  ]);
};

module.exports = {
  getDirectorMoviesCount,
  getYearMoviesFind,
};
