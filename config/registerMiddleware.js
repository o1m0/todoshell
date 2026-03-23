const express = require("express");
const session = require("express-session");
const path = require("path");

module.exports = function registerMiddleware(app) {
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(
        session({
            secret: "secret-key",
            resave: false,
            saveUninitialized: false,
        })
    );
    app.use((req, res, next) => {
        res.locals.userId = req.session.userId || null;
        next();
    });
    app.use(
        "/bootstrap",
        express.static(path.join(__dirname, "..", "node_modules", "bootstrap", "dist"))
    );
    app.use(express.static(path.join(__dirname, "..", "public")));
};
