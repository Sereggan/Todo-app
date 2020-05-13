const express = require("express");

const router = express.Router();
const tasksControllers = require("../controllers/tasks-controllers");

router.get("/user/:uid", tasksControllers.getTasks);

router.post("/", tasksControllers.addTask);

router.delete("/:tId", tasksControllers.deleteTask);

router.patch("/:tId", tasksControllers.updateTask);

module.exports = router;
