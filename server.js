const path = require("path");
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 4000;

connectDB();

const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.get("/", (req, res) => {
  res.send({ msg: "This is Root!" });
});

const quotasRouter = require("./routes/quotas");
app.use("/api/quotas", quotasRouter);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
