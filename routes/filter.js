const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  try {
    const q = (req.body.query || "").toLowerCase().trim();

    let query = {};
    let category = "All";
    let minPrice = 0;
    let maxPrice = 100000;

    // ================= CATEGORY DETECTION =================
    const categoryMap = {
      Electronics: ["laptop", "phone", "mobile", "gaming", "smartwatch", "headphone"],
      Clothing: ["shirt", "jeans", "jacket", "t-shirt", "sneakers"],
      Furniture: ["chair", "table", "desk", "bookshelf"],
      Accessories: ["watch", "bag", "sunglasses", "backpack"],
      Sports: ["gym", "sports", "football", "cricket", "bat"],
      "Home Appliances": ["coffee", "air fryer", "appliance"],
    };

    for (const [cat, keywords] of Object.entries(categoryMap)) {
      if (keywords.some((word) => q.includes(word))) {
        category = cat;
        break;
      }
    }

    // ================= PRICE DETECTION =================
    if (q.includes("cheap") || q.includes("budget")) {
      maxPrice = 10000;
    } else if (q.includes("mid")) {
      minPrice = 10000;
      maxPrice = 50000;
    } else if (q.includes("premium")) {
      minPrice = 50000;
    }

    // ================= BUILD QUERY =================
    if (category !== "All") {
      query.category = category;
    }

    query.price = { $gte: minPrice, $lte: maxPrice };

    // text search (name + description)
    if (q) {
      query.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
      ];
    }

    const products = await Product.find(query);

    return res.json({
      success: true,
      filters: {
        category,
        minPrice,
        maxPrice,
      },
      count: products.length,
      products,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;