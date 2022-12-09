const User = require('../models/UserSchema');

const getFavoritesStatistic = () => {
    return User.aggregate([
        {
            $unset: [ "email", "username", "roles", "token", "__v", "_id" ]
        },
        {
            $unwind: { path: "$favorites" },
        },
        {
            $group:
                {
                    "_id": "$favorites",
                    "count": {
                        $sum: 1
                    }
                }
        },
        {
            $lookup:
                {
                    from: "movies",
                    localField: "_id",
                    foreignField: "_id",
                    as: "title"
                }
        },
        {
            $unwind: { path: "$title" },
        },
        {
            $set: {
                "title": "$title.title"
            }
        }
    ]).exec();
}

module.exports = {
    getFavoritesStatistic,
}