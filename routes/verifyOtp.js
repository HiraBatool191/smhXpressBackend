const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("VERIFY OTP BODY:", req.body); // 🔥 DEBUG

    let { email, otp } = req.body || {};

    // 🔥 SAFE CHECK (must first)
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP required",
      });
    }

    email = String(email).trim();
    otp = String(otp).trim();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.otp) {
      return res.status(400).json({ message: "OTP not generated" });
    }

    if (String(user.otp) !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpiry && user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // ✅ SUCCESS
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    return res.json({
      message: "OTP verified successfully",
    });

  } catch (err) {
    console.log("OTP ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;