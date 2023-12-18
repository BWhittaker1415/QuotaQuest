const mongoose = require("mongoose");

const GoalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add some text"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  level: {
    type: String,
    required: [true, "Please select one of the options"],
  },
});

module.exports = mongoose.model("Goal", GoalSchema);
