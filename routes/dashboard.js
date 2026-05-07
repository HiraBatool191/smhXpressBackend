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

        const activities = await Activity.find({
          userId: user._id,
        });

        if (!activities.length) {
          return {
            _id: user._id,
            name: user.name,
            email: user.email,
            products: [],
          };
        }

        const map = new Map();

      activities.forEach((a) => {
  const key = a.productName || "Unknown";

  if (!map.has(key)) {
    map.set(key, {
      productName: key,
      timeSpent: 0,
      zoomCount: 0,
      actions: [],
    });
  }

  const item = map.get(key);

  item.timeSpent += a.timeSpent || 0;

  // ✅ FIXED ZOOM LOGIC
  if (a.action === "zoom") {
    item.zoomCount += 1;
  }

  item.actions.push(a.action);
});

        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          products: Array.from(map.values()),
        };
      })
    );

    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===================== STATS (🔥 FIXED REAL ACTIVE USERS) =====================
router.get("/stats", async (req, res) => {
  try {
    const users = await User.find();
    const usersCount = users.length;
    const productsCount = await Product.countDocuments();

    // 🔥 activity group
    const activityData = await Activity.aggregate([
      {
        $group: {
          _id: "$userId",
          totalTime: { $sum: "$timeSpent" },
          totalZoom: { $sum: "$zoomCount" },
        },
      },
    ]);

    // 🔥 VALID USERS ONLY
    const userIds = users.map(u => u._id.toString());

    const activeUsers = activityData.filter(
      (a) =>
        userIds.includes(a._id.toString()) &&
        (a.totalTime > 0 || a.totalZoom > 0)
    );

    res.json({
      users: usersCount,
      active: activeUsers.length, // ✅ FIXED
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

    const result = data.map((item) => ({
      date: item.createdAt.toISOString().split("T")[0],
      user: item.userId, // 🔥 FIXED (was wrong before)
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
          createdAt: { $gte: last7Days },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json(
      data.map((item) => ({
        name: item._id,
        value: item.count,
      }))
    );

  } catch (err) {
    res.status(500).json({ message: "Chart error" });
  }
});

module.exports = router;