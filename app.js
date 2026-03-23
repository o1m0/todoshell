const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const registerMiddleware = require("./config/registerMiddleware");
const registerRoutes = require("./config/registerRoutes");

require("dotenv").config({
  path: "./config/.env"
});

const app = express();

if (process.env.MONGO_URL) {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log(err);
        });
} else {
    console.warn("MONGO_URL is not set. Database connection was skipped.");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

registerMiddleware(app);
registerRoutes(app);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
