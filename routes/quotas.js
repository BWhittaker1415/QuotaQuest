const express = require("express");
const router = express.Router();
const Quota = require("../models/Quota");

// GET ALL
router.get("/", async (req, res) => {
  try {
    const quotas = await Quota.find();
    res.json({ success: true, data: quotas });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, error: "Something went wrong" });
  }
});

// GET ONE
router.get("/:id", async (req, res) => {
  try {
    const quota = await Quota.findById(req.params.id);
    res.json({ success: true, data: quota });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, error: "Something went wrong" });
  }
});

// CREATE ONE
router.post("/", async (req, res) => {
  const quota = new Quota({
    title: req.body.title,
    description: req.body.description,
    tag: req.body.tag,
    date: new Date().toISOString().slice(0, 10),
    // level: req.body.level,
  });

  try {
    const savedQuota = await quota.save();
    res.json({ success: true, data: savedQuota });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, error: "Something went wrong" });
  }
});

// UPDATE ONE
router.put("/:id", async (req, res) => {
  try {
    const updatedQuota = await Quota.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          tag: req.body.tag,
          date: new Date().toISOString().slice(0, 10),
          // level: req.body.level,
        },
      },
      { new: true }
    );
    res.json({ success: true, data: updatedQuota });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, error: "Something went wrong" });
  }
});

// DELETE ONE
router.delete("/:id", async (req, res) => {
  try {
    await Quota.findByIdAndDelete(req.params.id);
    res.json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json({ success: false, error: "Something went wrong" });
  }
});

module.exports = router;
