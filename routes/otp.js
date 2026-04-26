const express = require("express");
const User = require("../models/User");
const { sendOTPEmail } = require("../utils/sendEmail");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    try {
      await sendOTPEmail(email, otp);
      console.log(`✅ OTP email sent to: ${email}`);
    } catch (emailErr) {
      console.error("❌ Email send failed:", emailErr.message);
      console.log(`📧 OTP (fallback) for ${email}: ${otp}`);
    }

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;