const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// ================= TRACK ANY ACTIVITY =================
router.post("/", async (req, res) => {
  try {
    const {
      userId,
      productId,
      productName,
      action,
      timeSpent,
      zoomCount,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId required" });
    }

    await Activity.create({
      userId,
      productId,
      productName: productName || "Unknown Product",
      action,
      timeSpent: Number(timeSpent || 0),
      zoomCount: Number(zoomCount || 0),
    });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;