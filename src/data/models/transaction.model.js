import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },

    reference: {
      type: String,
      unique: true,
    },

    description: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["pending", "completed"],
      default: null,
    },

    amount: {
      type: Number,
      required: true,
    },

    channel: {
      type: String,
      enum: ["cash", "card", "transfer"],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", transactionSchema);
