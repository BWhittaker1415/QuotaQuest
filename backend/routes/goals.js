const express = require("express");
const router = express.Router();
const Goal = require("../models/Goal");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json({ success: true, data: goals });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, error: "Something went wrong" });
  }
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    res.json({ success: true, data: goal });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, error: "Something went wrong" });
  }
});

// CREATE ONE
router.post("/", async (req, res) => {
  const goal = new Goal({
    title: req.body.title,
    level: req.body.level,
  });

  try {
    const savedGoal = await goal.save();
    res.json({ success: true, data: savedGoal });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, error: "Something went wrong" });
  }
});

// UPDATE ONE
router.put("/:id", async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.text,
          level: req.body.tag,
        },
      },
      { new: true }
    );
    res.json({ success: true, data: updatedGoal });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, error: "Something went wrong" });
  }
});

// DELETE ONE
router.delete("/:id", async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
