const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  content: { type: String, required: true },
  status: { type: String, required: true, minlength: 6 },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
});

module.exports = mongoose.model("Task", taskSchema);
