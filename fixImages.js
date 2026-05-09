// fixImages.js — root mein banao
require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect(process.env.MONGO_URL).then(async () => {
  console.log("MongoDB Connected");

  const products = await Product.find();

  for (const p of products) {
    console.log(p.name, "=>", p.image); // current URL dekho
  }

  process.exit();
});