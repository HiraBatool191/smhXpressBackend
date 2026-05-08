// const express = require("express");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { email, newPassword } = req.body;

//     // check fields
//     if (!email || !newPassword) {
//       return res.status(400).json({
//         message: "Email and new password required",
//       });
//     }

//     // password validation
//     if (newPassword.length < 6) {
//       return res.status(400).json({
//         message: "Password must be at least 6 characters",
//       });
//     }

//     // find user
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found",
//       });
//     }

//     // OTP must be verified first
//     if (!user.isVerified) {
//       return res.status(400).json({
//         message: "Please verify OTP first",
//       });
//     }

//     // hash new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);

//     // save new password
//     user.password = hashedPassword;

//     // clear otp data only
//     user.otp = null;
//     user.otpExpiry = null;

//     // IMPORTANT:
//     // do NOT make isVerified false
//     // otherwise login will fail again

//     await user.save();

//     res.json({
//       message: "Password reset successful",
//     });

//   } catch (err) {
//     console.log("RESET PASSWORD ERROR:", err);

//     res.status(500).json({
//       message: "Server error",
//     });
//   }
// });

// module.exports = router;


const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    user.password = hashed;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;