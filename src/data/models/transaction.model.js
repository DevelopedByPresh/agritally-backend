import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const TransactionSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      autopopulate: {
        path: "orderId",
        populate: {
          path: "cartId",
          select: "cartItems productId",
        },
        select: "total status",
      },
      required: true,
    },

    type: {
      type: String,
      enum: ["Purchase", "Sale", "Mortality"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

TransactionSchema.plugin(autopopulate);

export default mongoose.model("Transaction", TransactionSchema);
