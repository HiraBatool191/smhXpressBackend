// const express = require("express");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User"); // Make sure this file exists
// const router = express.Router();

// // SIGNUP
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "User already exists" });

//     const hashed = await bcrypt.hash(password, 10);

//     const user = new User({ name, email, password: hashed });
//     await user.save();

//     res.json({ message: "User created successfully", user });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;



const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Make sure this file exists
const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashed });
    await user.save();

    console.log("USER SAVED, NOW SENDING EMAIL...");
    console.log("EMAIL_USER:", process.env.EMAIL_USER);

    try {
      await sendOTPEmail(email, otp);
      console.log(`✅ OTP email sent to: ${email}`);
    } catch (emailErr) {
      console.error("❌ Email send failed:", emailErr.message);
      console.log(`📧 OTP (fallback) for ${email}: ${otp}`);
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