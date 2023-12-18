const path = require("path");
const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const connectDB = require("./config/db");

connectDB();

const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ msg: "This is Root!" });
});

const goalsRouter = require("./routes/goals");
app.use("/api/goals", goalsRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
