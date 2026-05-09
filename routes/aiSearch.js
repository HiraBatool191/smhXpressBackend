const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  const q = (req.body.query || "").toLowerCase();

  // ================= INIT =================
  let category = "All";
  let minPrice = 0;
  let maxPrice = 100000;

  let query = {};

  // ================= CATEGORY =================
  if (q.includes("laptop") || q.includes("phone") || q.includes("gaming")) {
    category = "Electronics";
  } 
  else if (q.includes("shirt") || q.includes("jeans") || q.includes("jacket")) {
    category = "Clothing";
  } 
  else if (q.includes("chair") || q.includes("table")) {
    category = "Furniture";
  } 
  else if (q.includes("watch") || q.includes("bag")) {
    category = "Accessories";
  } 
  else if (q.includes("gym") || q.includes("sports")) {
    category = "Sports";
  }

  // ================= PRICE =================
 if (q.includes("cheap") || q.includes("budget")) {
  maxPrice = 60000;
}

  if (q.includes("mid")) {
    minPrice = 10000;
    maxPrice = 50000;
  }

  if (q.includes("premium")) {
    minPrice = 50000;
    maxPrice = 100000;
  }

  // ================= BUILD QUERY =================
  if (category !== "All") {
    query.category = category;
  }

 if (minPrice || maxPrice) {
  query.price = { $gte: minPrice, $lte: maxPrice };
}
  // search text
  if (q) {
    query.$or = [
      { name: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ];
  }

  const products = await Product.find(query);

  return res.json({
    filters: { category, minPrice, maxPrice },
    products,
  });
});

module.exports = router;