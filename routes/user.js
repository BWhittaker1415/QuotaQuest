const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register user
router.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
