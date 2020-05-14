const express = require("express");
const bodyParser = require("body-parser");

const tasksRoutes = require("./routes/tasks-routes");
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/users", usersRoutes);
app.use("/api/tasks", tasksRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  res.json({ error: error.message || "An unknown error occurred!", code: 404 });
});

console.log("Created a server");

app.listen(5000);
