const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },          // ✅ phone number add kiya
  avatar: { type: String },
  otp: { type: Number },
  otpExpiry: { type: Date },
});

module.exports = mongoose.model("User", userSchema);