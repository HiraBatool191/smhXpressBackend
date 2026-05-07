const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Activity = require("../models/Activity");

router.post("/", async (req, res) => {
  try {
    console.log("RAW BODY:", req.body);

    const activity = await Activity.create({
      userId: req.body.userId,
      productId: req.body.productId,
      productName: req.body.productName,
      action: req.body.action,
      timeSpent: req.body.timeSpent || 0,
      zoomCount: req.body.zoomCount || 0,
    });

    res.json(activity);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;