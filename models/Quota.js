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
    type: Date,
    default: Date.now,
  },
  // level: {
  //   type: String,
  //   required: [true, "Please select one of the options"],
  // },
});

const Quota = mongoose.model("Quota", QuotaSchema);

module.exports = Quota;
