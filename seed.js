const mongoose = require("mongoose");
const Product = require("./models/Product");

// 🔥 JSON import
const products = require("./data/products.json"); // path check kar lena

mongoose.connect("mongodb+srv://batoolhira2020_db_user:p2a8tGRzXkmsNbQm@cluster0.awwluuv.mongodb.net/smhXpress?retryWrites=true&w=majority")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

const run = async () => {
  try {
    await Product.deleteMany();

    // 🔥 insert JSON data
    const res = await Product.insertMany(products);

    console.log("Inserted:", res.length);
  } catch (err) {
    console.log("Seed Error:", err);
  } finally {
    mongoose.connection.close();
  }
};

run();