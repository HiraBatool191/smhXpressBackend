const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Product = require("../models/Product");
const Activity = require("../models/Activity");


// ===================== STATS =====================
router.get("/stats", async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();

    res.json({
      users: usersCount,
      active: Math.floor(usersCount * 0.3),
      orders: Math.floor(productsCount * 1.5),
      revenue: productsCount * 500,
    });

  } catch (error) {
    res.status(500).json({ message: "Stats error", error });
  }
});


// ===================== USERS =====================
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("name email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Users error", error });
  }
});


// ===================== TOP PRODUCTS =====================
router.get("/top-products", async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ views: -1 })
      .limit(5);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Products error", error });
  }
});


// ===================== ACTIVITY =====================
router.get("/activity", async (req, res) => {
  try {
    const activity = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(activity);
  } catch (error) {
    res.status(500).json({ message: "Activity error", error });
  }
});


// ===================== CHART =====================
router.get("/chart", async (req, res) => {
  try {
    // Example: future me DB-based aggregation ho sakta hai
    res.json([
      { name: "Mon", value: 0 },
      { name: "Tue", value: 0 },
      { name: "Wed", value: 0 },
      { name: "Thurs", value: 0 },
      { name: "Fri", value: 0 },
      { name: "Sat", value: 0 },
      { name: "Sun", value: 0 },
    ]);
  } catch (error) {
    res.status(500).json({ message: "Chart error", error });
  }
});

module.exports = router;