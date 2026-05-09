

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String,
  views: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);