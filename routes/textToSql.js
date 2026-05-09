const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// 👇 YAHAN SE START
router.post("/", async (req, res) => {
  try {
    const q = (req.body.query || "").toLowerCase().trim();

    let query = {};
    let category = null;
    let minPrice = 0;
    let maxPrice = 100000;

    if (!q) {
      return res.status(200).json({
        success: true,
        products: [],
      });
    }

    query.price = { $gte: minPrice, $lte: maxPrice };

    let products = await Product.find(query);

    if (!products || products.length === 0) {
      products = await Product.find({
        $or: [
          { name: { $regex: q, $options: "i" } },
          { description: { $regex: q, $options: "i" } },
        ],
      });
    }

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (err) {
    console.log("ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// 👇 END ME
module.exports = router;