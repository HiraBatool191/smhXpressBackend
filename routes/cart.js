const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

// ================= ADD TO CART =================
router.post("/add", async (req, res) => {
  try {
    const { userId, productId, productName } = req.body;

    await Activity.create({
      userId,
      productId,
      productName,
      action: "add_to_cart",
    });

    res.json({ message: "Added to cart" });

  } catch (err) {
    res.status(500).json({ message: "Cart error" });
  }
});

// ================= REMOVE FROM CART =================
router.post("/remove", async (req, res) => {
  try {
    const { userId, productId, productName } = req.body;

    await Activity.create({
      userId,
      productId,
      productName,
      action: "remove_from_cart",
    });

    res.json({ message: "Removed from cart" });

  } catch (err) {
    res.status(500).json({ message: "Remove error" });
  }
});

module.exports = router;