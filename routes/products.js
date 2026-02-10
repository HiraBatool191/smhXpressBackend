const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const products = require("../data/products.json");

// Auth middleware
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

// All products (protected)
router.get("/products", auth, (req, res) => {
  res.json(products);
});

// Single product
router.get("/products/:id", auth, (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

module.exports = router;
