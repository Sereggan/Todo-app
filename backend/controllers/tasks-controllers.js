const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const Task = require("../models/task");
const User = require("../models/user");

const getTasks = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const userId = req.params.uid;
  let userWithTasks;
  try {
    userWithTasks = await User.findById(userId).populate("tasks");
  } catch (err) {
    const error = new HttpError(
      "Fetching tasks failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!userWithTasks || userWithTasks.tasks.length === 0) {
    return next(
      new HttpError("Could not find tasks for the provided user id.", 404)
    );
  }

  if (userWithTasks.id !== req.userData.userId) {
    const error = new HttpError("You are not allowed to do it.", 401);
    return next(error);
  }

  res.json({
    tasks: userWithTasks.tasks.map((task) => task.toObject({ getters: true })),
  });
};

const addTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { creator, content, status } = req.body;
  const createdTask = new Task({
    content,
    status,
    creator,
  });
  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Creating task failed, please try again.", 500);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("Could not find user for provided id.", 404);
    return next(error);
  }

  if (user.id !== req.userData.userId) {
    const error = new HttpError("You are not allowed to do it.", 401);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTask.save({ session: sess });
    user.tasks.push(createdTask);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating task failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ task: createdTask });
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.tId;
  let task;
  try {
    task = await Task.findById(taskId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete task.",
      500
    );
    return next(error);
  }

  if (!task) {
    const error = new HttpError("Could not find task for this id.", 404);
    return next(error);
  }

  if (task.creator.id !== req.userData.userId) {
    const error = new HttpError("You are not allowed to do it.", 401);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await task.remove({ session: sess });
    task.creator.tasks.pull(task);
    await task.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete task.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted task." });
};

const updateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { status } = req.body;
  const taskId = req.params.tId;

  let task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update task.",
      500
    );
    return next(error);
  }

  if (task.creator.toString() !== req.body.userId) {
    const error = new HttpError("You are not allowed to do it.", 401);
    return next(error);
  }

  task.status = status;

  try {
    await task.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update task.",
      500
    );
    return next(error);
  }

  res.status(200).json({ task: task.toObject({ getters: true }) });
};

exports.getTasks = getTasks;
exports.addTask = addTask;
exports.deleteTask = deleteTask;
exports.updateTask = updateTask;
