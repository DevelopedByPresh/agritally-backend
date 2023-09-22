const mongoose = require("mongoose");

const cartItemsSchema = new mongoose.Schema({
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
});

export const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
  },

  active: {
    type: Boolean,
    default: true,
  },

  cartItems: [cartItemsSchema],

  total: {
    type: Number,
    default: null,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
