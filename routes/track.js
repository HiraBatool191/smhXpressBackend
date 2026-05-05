const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

router.post("/track", async (req, res) => {
  try {
    const {
      userId,
      productId,
      productName,
      timeSpent,
      zoomCount,
      action,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId missing" });
    }

    const activity = await Activity.create({
      userId,
      productId,
      productName,
      timeSpent: timeSpent || 0,
      zoomCount: zoomCount || 0,
      action,
    });

    res.status(201).json(activity);
  } catch (err) {
    console.log("TRACK ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;