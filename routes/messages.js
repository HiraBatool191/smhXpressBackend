const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// ================= SEND MESSAGE =================
router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({
        error: "Missing data",
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
      createdAt: new Date(),
    });

    res.status(201).json(newMessage);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// ================= GET CHAT =================
router.get("/:userId/:adminId", async (req, res) => {
  try {
    const { userId, adminId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          senderId: userId,
          receiverId: adminId,
        },
        {
          senderId: adminId,
          receiverId: userId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;