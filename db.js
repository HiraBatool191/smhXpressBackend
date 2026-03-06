// require("dotenv").config();

// const mongoose = require("mongoose");

// mongoose.connect(process.env.MONGO_URL) // no options needed
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.error("MongoDB Connection Error:", err));
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));