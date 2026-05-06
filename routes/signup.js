// const express = require("express");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User"); // Make sure this file exists
// const router = express.Router();

// // SIGNUP
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);

//     const user = new User({ name, email, password: hashed });
//     await user.save();

//     console.log("USER SAVED, NOW SENDING EMAIL...");
//     console.log("EMAIL_USER:", process.env.EMAIL_USER);

//     try {
//       await sendOTPEmail(email, otp);
//       console.log(`✅ OTP email sent to: ${email}`);
//     } catch (emailErr) {
//       console.error("❌ Email send failed:", emailErr.message);
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET || "secretKey123",
//       { expiresIn: "1h" }
//     );

//     res.json({
//       message: "User created successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         avatar: user.name.charAt(0),
//       },
//       token,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;



// routes/signup.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendOTPEmail } = require("../utils/sendEmail"); // ✅ import add kiya
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    // ✅ OTP generate karo
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const user = new User({
      name,
      email,
      password: hashed,
      phone,
      otp,
      otpExpiry,
    });
    await user.save();

    // ✅ Email bhejo
    try {
      await sendOTPEmail(email, otp);
      console.log(`✅ OTP email sent to: ${email}`);
    } catch (emailErr) {
      console.error("❌ Email send failed:", emailErr.message);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secretKey123",
      { expiresIn: "1h" }
    );

    res.json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.name.charAt(0),
      },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;