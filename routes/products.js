// // const express = require("express");
// // const router = express.Router();
// // const jwt = require("jsonwebtoken");
// // const products = require("../data/products.json");

// // const auth = (req, res, next) => {
// //   const token = req.headers.authorization?.split(" ")[1];
// //   if (!token) return res.status(401).json({ message: "No token provided" });

// //   try {
// //     const decoded = jwt.verify(token, "secretKey123");
// //     req.user = decoded;
// //     next();
// //   } catch (err) {
// //     res.status(401).json({ message: "Invalid token" });
// //   }
// // };

// // router.get("/products", (req, res) => {
// //   res.json(products);
// // });

// // router.get("/products/:id", (req, res) => {
// //   const id = parseInt(req.params.id);
// //   const product = products.find((p) => p.id === id);
// //   if (!product) return res.status(404).json({ message: "Product not found" });
// //   res.json(product);
// // });

// // router.post("/order", auth, (req, res) => {
// //   const userId = req.user.id;
// //   res.json({ message: `Order placed successfully by user ${userId}` });
// // });

// // module.exports = router;


// const express = require("express");
// const router = express.Router();
// const products = require("../data/products.json");

// // GET all products
// router.get("/products", (req, res) => {
//   res.json(products);
// });

// // GET single product by id
// router.get("/products/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const product = products.find((p) => p.id === id);
//   if (!product) return res.status(404).json({ message: "Product not found" });
//   res.json(product);
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const products = require("../data/products.json");

// // AUTH middleware
// const auth = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const decoded = jwt.verify(token, "secretKey123");
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// // ✅ GET all products (TOKEN REQUIRED)
// router.get("/products", auth, (req, res) => {
//   res.json(products);
// });

// // GET single product
// router.get("/products/:id", auth, (req, res) => {
//   const id = parseInt(req.params.id);
//   const product = products.find((p) => p.id === id);

//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   res.json(product);
// });

// // PLACE ORDER
// router.post("/order", auth, (req, res) => {
//   const userId = req.user.id;
//   res.json({ message: `Order placed successfully by user ${userId}` });
// });

// module.exports = router;

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
    return res.status(401).json({ message: "Invalid token" });
  }
};

// GET /api/products (TOKEN REQUIRED)
router.get("/", auth, (req, res) => res.json(products));

// GET /api/products/:id (TOKEN REQUIRED)
router.get("/:id", auth, (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
});

// POST /api/products/order (TOKEN REQUIRED)
router.post("/order", auth, (req, res) => {
  const userId = req.user.id;
  res.json({ message: `Order placed successfully by user ${userId}` });
});

module.exports = router;