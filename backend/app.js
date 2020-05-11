const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

console.log("Created a server");

app.listen(5000);
