const mongoose = require("mongoose");


const cartItemSchema = {
  productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
  },

  price: {
      type: Number,
      required: true,
  },

  quantity: {
      type: Number,
      required: true,
  },

  subtotal: {
      type: Number,
      required: true,
  },
};

const cartSchema = new mongoose.Schema(
  {
      user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
      },

      active: {
          type: Boolean,
          default: true,
      },

      cartItems: [cartItemSchema],

      total: {
          type: Number,
          default: null,
      },
  },

  {
    timestamps: true
  }
);


module.exports = mongoose.model("Cart", cartSchema);
