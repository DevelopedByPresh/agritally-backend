const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
