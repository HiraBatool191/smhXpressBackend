// const express = require("express");
// const User = require("../models/User");

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ message: "User not found" });

//     if (user.otp !== otp)
//       return res.status(400).json({ message: "Invalid OTP" });

//     if (user.otpExpiry < Date.now())
//       return res.status(400).json({ message: "OTP expired" });

//     user.isVerified = true;
//     user.otp = null;
//     user.otpExpiry = null;

//     await user.save();

//     res.json({ message: "OTP verified successfully" });

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;



const express = require("express");
const User = require("../models/User");
const { sendOTPEmail } = require("../utils/sendEmail");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.trim() });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // ✅ New OTP generate karo
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ✅ DB mein save karo
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.isVerified = false;
    await user.save();

    // ✅ Email bhejo
    const emailSent = await sendOTPEmail(email.trim(), otp);

    if (!emailSent) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    res.json({ message: "OTP sent to your email" });

  } catch (err) {
    console.error("SEND OTP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;