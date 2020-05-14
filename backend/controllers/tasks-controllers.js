const HttpError = require("../models/http-error");

let DUMMY_TASKS = [
  {
    id: 1,
    creator: "1",
    content: "Task 1 Hi",
    status: "Active",
  },
  {
    id: 2,
    creator: "1",
    content: "Task 2 Hi",
    status: "Delayed",
  },
  {
    id: 3,
    creator: "2",
    content: "Task 3 Hi",
    status: "Cancelled",
  },
];

const getTasks = (req, res, next) => {
  const authorId = req.params.uid;
  const returnTasks = DUMMY_TASKS.filter((task) => {
    return task.creator === authorId;
  });
  if (!returnTasks) {
    return new HttpError("Could not find tasks", 404);
  }
  res.json({ tasks: returnTasks });
};

const addTask = (req, res, next) => {
  const { creator, content, status } = req.body;
  const taskId = DUMMY_TASKS[DUMMY_TASKS.length - 1].id + 1;
  const newTask = {
    id: taskId,
    creator: creator,
    content: content,
    status: status,
  };
  DUMMY_TASKS.push(newTask);
  res.status(201).json({ createdTask: newTask });
};

const deleteTask = (req, res, next) => {
  const taskId = req.params.tId;
  console.log(taskId);

  console.log(DUMMY_TASKS);
  res.status(200).json({ message: "Deleted task." });
};

const updateTask = (req, res, next) => {
  const taskId = req.params.tId;
  const { newStatus } = req.body;
  for (let i = 0; i < DUMMY_TASKS.length; i++) {
    if (DUMMY_TASKS[i].id == taskId) {
      DUMMY_TASKS[i].status = newStatus;
      console.log("Got here!");
    }
  }
  res.status(201).json({ mesage: "Status updated" });
};

exports.getTasks = getTasks;
exports.addTask = addTask;
exports.deleteTask = deleteTask;
exports.updateTask = updateTask;
