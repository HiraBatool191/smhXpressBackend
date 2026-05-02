const mongoose = require("mongoose");
const Product = require("./models/Product");

// 🔥 SAME AS BACKEND
mongoose.connect("mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myDatabase")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const products = [
  { name: "Laptop", price: 50000, category: "Electronics", views: 10 },
  { name: "Smartphone", price: 25000, category: "Electronics", views: 5 },
  { name: "Office Chair", price: 8000, category: "Furniture", views: 2 }
];

const run = async () => {
  await Product.deleteMany();
  const res = await Product.insertMany(products);

  console.log("Inserted:", res.length);
  mongoose.connection.close();
};

run();