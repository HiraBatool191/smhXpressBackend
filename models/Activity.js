const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: String,
    productName: String,

    timeSpent: { type: Number, default: 0 },
    zoomCount: { type: Number, default: 0 },

    action: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);