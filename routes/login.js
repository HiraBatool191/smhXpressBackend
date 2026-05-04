  // const express = require("express");
  // const bcrypt = require("bcryptjs");
  // const jwt = require("jsonwebtoken");
  // const User = require("../models/User");
  // const router = express.Router();

  // router.post("/", async (req, res) => {
  //   try {
  //     const { email, password } = req.body;

  //     const user = await User.findOne({ email });
  //     if (!user) return res.status(400).json({ message: "Invalid credentials" });

  //     const isMatch = await bcrypt.compare(password, user.password);
  //     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  //     const token = jwt.sign(
  //       { id: user._id, email: user.email },
  //       process.env.JWT_SECRET || "secretKey123",  // ✅ env se le raha hai
  //       { expiresIn: "7d" }
  //     );

  //     res.json({
  //       message: "Login successful",
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




  const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Activity = require("../models/Activity"); // 🔥 ADD THIS

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "secretKey123",
      { expiresIn: "7d" }
    );

    // 🔥 ADD ACTIVITY HERE
    await Activity.create({
      user: user.name,
      action: "Logged in",
    });

    res.json({
      message: "Login successful",
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