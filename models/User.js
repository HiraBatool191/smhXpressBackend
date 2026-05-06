// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   phone: { type: String },          // ✅ phone number add kiya
//   avatar: { type: String },
//   otp: { type: Number },
//   otpExpiry: { type: Date },
// });

// module.exports = mongoose.model("User", userSchema);

// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    phone: {
      type: String,
      default: "N/A",
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    otp: {
      type: String,
      default: null,
    },
    otpExpiry: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);