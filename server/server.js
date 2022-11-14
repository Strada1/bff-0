require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL
    })
);

app.use(express.json()); // в express есть встроенный модуль
app.use("/api", router);

const start = async () => {
    try {
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();
