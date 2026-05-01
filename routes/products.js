const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const products = require("../data/products.json");

// ✅ Public routes - no auth needed
router.get("/products", (req, res) => {
  res.json(products);
});

router.get("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// ✅ Protected route - auth required
router.post("/order", auth, (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  res.json({
    message: `Order placed successfully`,
    order: { userId, productId, quantity },
  });
});

module.exports = router;