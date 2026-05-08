const express = require("express");
const router = express.Router();
const multer = require("multer");
const Product = require("../models/Product");

const upload = multer({ storage: multer.memoryStorage() });

// SIMPLE DEMO MATCH (REAL AI later replace hoga)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const products = await Product.find();

    // ⚠️ DEMO LOGIC (filename based fallback removed)
    const matched = products.filter((p) => {
      return (
        p.name.toLowerCase().includes("shirt") ||
        p.category.toLowerCase().includes("clothing") ||
        p.name.toLowerCase().includes("shoe")
      );
    });

    res.json({
      products: matched,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;