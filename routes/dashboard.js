const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Product = require("../models/Product");
const Activity = require("../models/Activity");


// ===================== USERS WITH ACTIVITY =====================
router.get("/users-with-activity", async (req, res) => {
  try {
    const users = await User.find();

    const result = await Promise.all(
      users.map(async (user) => {

        // ✅ FIX: proper DB query (no filter bug)
        const userActivity = await Activity.find({ userId: user._id });

        const timeSpent = userActivity.reduce(
          (sum, a) => sum + (a.timeSpent || 0),
          0
        );

       const zoomCount = userActivity.reduce(
  (sum, a) => sum + (a.zoomCount || 0),
  0
);
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          timeSpent,
          zoomCount,
          productName: userActivity.at(-1)?.productName || "—",
        };
      })
    );

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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
    const data = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(20);

    const result = data.map(item => ({
      date: item.createdAt.toISOString().split("T")[0],
      user: item.user,
      action: item.action,
    }));

    res.json(result);

  } catch (error) {
    res.status(500).json({ message: "Activity error", error });
  }
});


// ===================== CHART =====================
router.get("/chart", async (req, res) => {
  try {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 6);

    const data = await Activity.aggregate([
      {
        $match: {
          createdAt: { $gte: last7Days }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    const result = data.map(item => ({
      name: item._id,
      value: item.count
    }));

    res.json(result);

  } catch (err) {
    res.status(500).json({ message: "Chart error" });
  }
});


module.exports = router;