const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
router.post("/", async (req, res) => {
  const q = (req.body.query || "").toLowerCase();

  let mongoQuery = {};

  // category fix
  if (q.includes("laptop") || q.includes("gaming")) {
    mongoQuery.category = "Electronics";
  }

  // ⚠️ REMOVE PRICE FILTER TEMPORARILY
  // mongoQuery.price = { $lte: 20000 };
``
  mongoQuery.$or = [
    { name: { $regex: q, $options: "i" } },
    { description: { $regex: q, $options: "i" } }
  ];

  const products = await Product.find(mongoQuery);

  console.log("QUERY:", mongoQuery);
  console.log("FOUND:", products.length);

  res.json({ mongoQuery, products });
});

module.exports = router;