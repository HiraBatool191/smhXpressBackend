const mongoose = require("mongoose");
const Product = require("./models/Product");
const products = require("./data/products.json"); // 🔥 IMPORT JSON

mongoose.connect("mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myDatabase")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const run = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("All products inserted from JSON file");
  } catch (err) {
    console.log("Seed error:", err);
  } finally {
    mongoose.connection.close();
  }
};

run();