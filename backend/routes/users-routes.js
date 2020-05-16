const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const tasksControllers = require("../controllers/users-controllers");

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  tasksControllers.signup
);

router.post("/login", tasksControllers.login);

module.exports = router;
