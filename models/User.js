// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   avatar: { type: String } // avatar URL
// });

// module.exports = mongoose.model("User", userSchema);


// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   avatar: { type: String },

//   otp: { type: String },          // ✅ ADD
//   otpExpiry: { type: Date }       // ✅ ADD
// });

// module.exports = mongoose.model("User", userSchema);


const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },          // ✅ phone number add kiya
  avatar: { type: String },
  otp: { type: String },
  otpExpiry: { type: Date },
});

module.exports = mongoose.model("User", userSchema);