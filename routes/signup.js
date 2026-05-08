


// const express = require("express");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const { sendOTPEmail } = require("../utils/sendEmail");

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { name, email, password, phone } = req.body;

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     await User.create({
//       name,
//       email,
//       phone,
//       password: hashedPassword,
//       otp,
//       otpExpiry: Date.now() + 10 * 60 * 1000,
//       isVerified: false,
//     });

//     await sendOTPEmail(email, otp);

//     res.json({
//       message: "Signup successful. OTP sent to email.",
//     });

//   } catch (err) {
//     console.log("SIGNUP ERROR:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { sendOTPEmail } = require("../utils/sendEmail");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
      isVerified: false,
    });

    // email background me bhejo
    sendOTPEmail(email, otp);

    res.json({
      message: "Signup successful. OTP sent.",
      user,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;