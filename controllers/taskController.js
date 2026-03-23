const Task = require("../models/Task");

exports.index = async (req, res) => {
    try {
        const tasks = await Task.find({ userid: req.session.userId })
            .sort({ createdAt: -1 })
            .lean();

        res.render("task", { tasks, user: req.session.user });
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed to load tasks");
    }
};

exports.create = async (req, res) => {
    try {
        const title = String(req.body.title || "").trim();

        if (!title) {
            return res.status(400).json({ message: "Task title is required." });
        }

        const task = await Task.create({
            title,
            userid: req.session.userId,
        });

        res.status(201).json({
            task: {
                _id: task._id,
                title: task.title,
                completed: task.completed,
                createdAt: task.createdAt,
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create task." });
    }
};
