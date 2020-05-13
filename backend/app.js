const express = require("express");
const bodyParser = require("body-parser");

const tasksRoutes = require("./routes/tasks-routes");
const usersRoutes = require("./routes/users-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

console.log("Created a server");

app.listen(5000);
