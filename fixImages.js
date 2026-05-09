// Ek baar run karo — ek alag script file banao: fixImages.js
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URL).then(async () => {
  const products = await Product.find();

  for (const p of products) {
    if (p.image && p.image.includes("unsplash.com") && !p.image.includes("?")) {
      p.image = p.image + "?w=800&q=80";
      await p.save();
    }
  }

  console.log("✅ All images fixed!");
  process.exit();
});