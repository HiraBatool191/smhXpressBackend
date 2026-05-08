// const express = require("express");
// const User = require("../models/User");
// const { sendOTPEmail } = require("../utils/sendEmail");

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({
//         message: "Email is required",
//       });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found",
//       });
//     }

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save OTP
//     user.otp = otp;
//     user.otpExpiry = Date.now() + 10 * 60 * 1000;

//     // Required for forgot password flow
//     user.isVerified = false;

//     await user.save();

//     // Send email
//     await sendOTPEmail(email, otp);

//     res.json({
//       message: "OTP sent successfully",
//     });

//   } catch (err) {
//     console.log("SEND OTP ERROR:", err);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const User = require("../models/User");
const { sendOTPEmail } = require("../utils/sendEmail");

const router = express.Router();

router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.otp = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await user.save();

    await sendOTPEmail(email, otp);

    res.json({ message: "OTP sent successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;