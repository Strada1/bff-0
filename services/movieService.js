const Movie = require('../models/MovieSchema');
const {ObjectId} = require("mongodb");
const {deleteComment} = require("./commentsService");

const createMovie = async ({title, year, director, rating, category}) => {
    const movies = await getMovies({filters: {title, year, director, rating, category}})
    const hasMovie = movies.length !== 0;

    return hasMovie ?
        movies[0]
        :
        (await (await Movie.create({title, year, director, rating, category}))
            .populate('director'))
            .populate('category');
}

const createManyMovies = (movies) => {
    const result = []
    movies.forEach((item) => {
        const { title, year, director, rating, category } = item;
        result.push(createMovie({ title, year, director, rating, category }));
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

const getMovies = ({ filters, sort } = {}) => {
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

const getByIdMovie = (id) => {
    return Movie.findById(id)
        .populate('director')
        .populate('category')
        .populate('comments');
}

const updateMovie = ({ movieId, ...updates }) => {
    return Movie.findByIdAndUpdate(movieId, {...updates}, { new: true, rawResult: true });
}

const deleteMovie = async (id) => {
    const { comments } = await getByIdMovie(id);

    const hasComment = comments.length !== 0;
    if (hasComment) {
        for (let i = 0; i < comments.length; ++i) {
            const id = comments[i]._id.valueOf()
            await deleteComment(id);
        }
    }
    return Movie.findByIdAndDelete(id);
}

module.exports = {
    createMovie, createManyMovies, getMovies, getByIdMovie, updateMovie, deleteMovie
}