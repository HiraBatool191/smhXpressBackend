const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// ================= ADD TO CART =================
router.post("/add", async (req, res) => {
  try {
    const { user, product } = req.body;

    await Activity.create({
      user,
      action: `Added ${product} to cart`,
    });

    res.json({ message: "Added to cart successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Cart error" });
  }
});

// ================= REMOVE FROM CART =================
router.post("/remove", async (req, res) => {
  try {
    const { user, product } = req.body;

    await Activity.create({
      user,
      action: `Removed ${product} from cart`,
    });

    res.json({ message: "Removed from cart" });

  } catch (err) {
    res.status(500).json({ message: "Remove error" });
  }
});

module.exports = router;