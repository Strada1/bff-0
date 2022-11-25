const Movie = require('../models/MovieSchema');
const {ObjectId} = require("mongodb");

const createMovie = ({ title, year, director, rating, category, comments = [] }) => {
    return Movie.create({ title, year, director, rating, category, comments });
}

const createManyMovies = (movies) => {
    const result = []
    movies.forEach((item) => {
        const { title, year, director, rating, category, comments } = item;
        result.push(createMovie({ title, year, director, rating, category, comments: comments ?? [] }));
    })
    return result;
}

// просто еще один способ реализации
//
// const getMovies = ({ filters, sort }) => {
//     const filtersQuery = {};
//     for (const key in filters) {
//         const isNotEmpty = !!filters[key];
//         if (isNotEmpty) {
//             const isMongoId = key === 'director' || key === 'category';
//             filtersQuery[key] = isMongoId ? new ObjectId(filters[key]) : filters[key];
//         }
//     }
//
//     const sortQuery = {};
//     const isNotEmpty = !!sort;
//     if (isNotEmpty) {
//         const parameter = sort.split(' ');
//         parameter.forEach((item) => {
//             const hasPrefix = item[0] === '-';
//             if (hasPrefix) {
//                 sortQuery[item.slice(1, item.length)] = -1;
//             } else {
//                 sortQuery[item] = 1;
//             }
//         })
//     } else {
//         sortQuery._id = 1;
//     }
//
//     return Movie.aggregate([
//         {
//             $match: filtersQuery,
//         },
//         {
//             $sort: sortQuery,
//         },
//         {
//             $lookup:
//                 {
//                     from: "directors",
//                     localField: "director",
//                     foreignField: "_id",
//                     as: "director"
//                 }
//         },
//         {
//             $unwind: "$director"
//         },
//         {
//             $lookup:
//                 {
//                     from: "categories",
//                     localField: "category",
//                     foreignField: "_id",
//                     as: "category"
//                 }
//         },
//         {
//             $unwind: "$category"
//         },
//         {
//             $lookup:
//                 {
//                     from: "comments",
//                     localField: "comments",
//                     foreignField: "_id",
//                     as: "comments"
//                 }
//         }
//     ]);
// }

const getMovies = ({ filters, sort }) => {
    const movies = Movie.find()
        .populate('director')
        .populate('category')
        .populate('comments');

    for (const key in filters) {
        const isNotEmpty = filters[key];
        if (isNotEmpty) {
            const isMongoId = key === 'director' || key === 'category';
            movies.where(key, isMongoId ? new ObjectId(filters[key]) : filters[key]);
        }
    }
    movies.sort(sort);
    return movies;
}

const findByIdMovie = (id) => {
    return Movie.findById(id)
        .populate('director')
        .populate('category')
        .populate('comments');
}

const updateMovie = ({ movieId, ...updates }) => {
    return Movie.findByIdAndUpdate(movieId, {...updates}, { new: true, rawResult: true });
}

const deleteMovie = (id) => {
    return Movie.findByIdAndDelete(id);
}

module.exports = {
    createMovie, createManyMovies, findByIdMovie, updateMovie, deleteMovie, getMovies
}