import mongoose from "mongoose";

const cartItemSchema = {
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product"
  },

  price: {
    type: Number,
  },

  quantity: {
    type: Number,
    default: 1,
  },

  subtotal: {
    type: Number,
  },
};

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    cartItems: [cartItemSchema],

    active: {
      type: Boolean,
      default: true,
    },

    total: {
      type: Number,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Cart", cartSchema);
