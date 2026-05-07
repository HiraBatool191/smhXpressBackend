const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },

    productName: String,

    action: {
      type: String,
      enum: ["view_end", "zoom", "add_to_cart", "remove_from_cart"],
    },

    timeSpent: { type: Number, default: 0 },
    zoomCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);