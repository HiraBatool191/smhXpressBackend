const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  message: String,

  from: {
    type: String,
    enum: ["user", "admin"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);