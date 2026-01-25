const mongoose = require("mongoose");

const mongoURL = "mongodb://127.0.0.1:27017/mydb"; 

mongoose.connect(mongoURL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
