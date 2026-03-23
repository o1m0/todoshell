const pageRoutes = require("../routes/pages");
const authRoutes = require("../routes/auth");
const taskRoutes = require("../routes/tasks");

module.exports = function registerRoutes(app) {
    app.use(pageRoutes);
    app.use(authRoutes);
    app.use(taskRoutes);
};
