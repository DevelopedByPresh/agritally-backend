import { Schema, model } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },

    total: {
      type: Number,
    },

    status: {
      type: String,
      enum: ["Approved", "Pending"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Order = model('Order', orderSchema);
