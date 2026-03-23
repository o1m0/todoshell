const express = require("express");
const router = express.Router();
const { requireLogin } = require("../middleware/auth");
const taskController = require("../controllers/taskController");

router.get("/tasks", requireLogin, taskController.index);
router.post("/tasks", requireLogin, taskController.create);

module.exports = router;
