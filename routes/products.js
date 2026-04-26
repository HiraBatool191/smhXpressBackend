// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const products = require("../data/products.json");

// const auth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, "secretKey123");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// router.get("/products", (req, res) => {
//   res.json(products);
// });

// router.get("/products/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const product = products.find((p) => p.id === id);
//   if (!product) return res.status(404).json({ message: "Products not found" });
//   res.json(product);
// });

// router.post("/order", auth, (req, res) => {
//   const userId = req.user.id;
//   res.json({ message: `Order placed successfully by user ${userId}` });
// });

// module.exports = router;



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