const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Mongo DB Connected`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDB;
