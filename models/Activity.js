const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: String, // ✅ FIXED (was Mixed → causing mismatch)
      required: true,
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    productName: {
      type: String,
      default: "",
    },

    action: {
      type: String,
      enum: [
        "view_end",
        "zoom",
        "add_to_cart",
        "remove_from_cart",
        "admin_view",
      ],
    },

    timeSpent: {
      type: Number,
      default: 0,
    },

    zoomCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);