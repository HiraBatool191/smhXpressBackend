const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ✅ FIXED
    ref: "User",
    required: true,
  },

  productId: String,
  productName: String,

  timeSpent: {
    type: Number,
    default: 0,
  },

  zoomCount: {
    type: Number,
    default: 0,
  },

  action: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Activity", activitySchema);