require("dotenv").config();
const express = require("express");
const cors = require("cors");
const MoviesRoute = require("./routes/movies");
const CategoryRoute = require("./routes/category");
const CommentRoute = require("./routes/comment");
const DirectorRoute = require("./routes/director");
const connectDB = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL
    })
);

app.use(express.json());
app.use("/api", MoviesRoute);
app.use("/api", CategoryRoute);
app.use("/api", CommentRoute);
app.use("/api", DirectorRoute);

const start = () => {
    try {
        connectDB();
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
