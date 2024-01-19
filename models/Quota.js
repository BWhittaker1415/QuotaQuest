const mongoose = require("mongoose");

const QuotaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add some text"],
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toISOString().slice(0, 10),
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Quota = mongoose.model("Quota", QuotaSchema);

module.exports = Quota;
