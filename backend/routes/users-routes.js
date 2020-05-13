const express = require("express");

const router = express.Router();
const tasksControllers = require("../controllers/users-controllers");

router.post("/signup", tasksControllers.signup);

router.post("/login", tasksControllers.login);

module.exports = router;
