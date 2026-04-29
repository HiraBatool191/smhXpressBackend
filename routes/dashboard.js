const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ================= STATS =================
router.get("/stats", async (req, res) => {
  try {
    const users = await User.countDocuments();

    const orders = 120;
    const revenue = 50000;
    const active = Math.floor(users * 0.25);

    res.json({
      users,
      active,
      orders,
      revenue
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ================= TOP PRODUCTS =================
router.get("/top-products", (req, res) => {
  res.json([
    { name: "Laptop", views: 200 },
    { name: "Phone", views: 150 },
    { name: "Shoes", views: 120 },
    { name: "Watch", views: 90 }
  ]);
});

// ================= ACTIVITY =================
router.get("/activity", (req, res) => {
  res.json([
    { user: "Ali", action: "viewed Laptop" },
    { user: "Sara", action: "added Phone to cart" },
    { user: "Ahmed", action: "zoomed Shoes" }
  ]);
});

// ================= CHART =================
router.get("/chart", (req, res) => {
  res.json([
    { name: "Mon", users: 30 },
    { name: "Tue", users: 50 },
    { name: "Wed", users: 40 },
    { name: "Thu", users: 70 },
    { name: "Fri", users: 90 }
  ]);
});

// ================= USERS LIST (IMPORTANT) =================
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("name email");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;