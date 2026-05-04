const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Product = require("../models/Product");
const Activity = require("../models/Activity");

// ================= AUTH =================
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, "secretKey123");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ================= GET ALL PRODUCTS =================
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ================= GET SINGLE PRODUCT + VIEW INCREASE =================
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ ONLY ONE WAY (CLEAN)
    product.views = (product.views || 0) + 1;
    await product.save();

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: "Error", err });
  }
});

// ================= ORDER =================
router.post("/order", auth, async (req, res) => {
  const userId = req.user.id;

  await Activity.create({
    user: userId,
    action: "Placed an order",
  });

  res.json({ message: `Order placed successfully by user ${userId}` });
});

module.exports = router;