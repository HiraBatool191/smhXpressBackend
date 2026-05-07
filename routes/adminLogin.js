const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Admin = require("../models/Admin");
const generateToken = require("../utils/generateToken");

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & password required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = generateToken(admin);

  res.json({
  message: "Login success",
  token,
  admin: {
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    firstChar: admin.name.charAt(0).toUpperCase(),
  },
});
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;