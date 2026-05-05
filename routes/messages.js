const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// ================= SEND MESSAGE =================
router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, message, from } = req.body;

    const msg = await Message.create({
      senderId,
      receiverId,
      message,
      from,
    });

    res.json(msg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= GET CHAT =================
router.get("/:userId/:adminId", async (req, res) => {
  try {
    const { userId, adminId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: adminId },
        { senderId: adminId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;