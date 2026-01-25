const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Helper to generate avatar with first letter
const getAvatarUrl = (name) => {
  const firstLetter = name.charAt(0).toUpperCase();
  return `https://ui-avatars.com/api/?name=${firstLetter}&background=random&color=fff&size=128&font-size=30&rounded=true`;
};

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarUrl = getAvatarUrl(name);

    const newUser = new User({ name, email, password: hashedPassword, avatar: avatarUrl });
    await newUser.save();

    res.json({
      message: "Signup successful",
      user: { id: newUser._id, name: newUser.name, email: newUser.email, avatar: newUser.avatar }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
