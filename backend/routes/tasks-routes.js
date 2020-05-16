const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();
const tasksControllers = require("../controllers/tasks-controllers");

router.use(checkAuth);

router.get("/user/:uid", tasksControllers.getTasks);

router.post(
  "/",
  [check("content").isLength({ min: 3 }), check("status").isLength({ min: 6 })],
  tasksControllers.addTask
);

router.delete("/:tId", tasksControllers.deleteTask);

router.patch(
  "/:tId",
  [check("status").isLength({ min: 2 })],
  tasksControllers.updateTask
);

module.exports = router;
