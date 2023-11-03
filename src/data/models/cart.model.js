import { Schema, model } from "mongoose";
import autopopulate from "mongoose-autopopulate";
const cartItemSchema = {
  productId: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: "Product",
    autopopulate: {
      select: "category section",
    },
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

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      autopopulate: {
        select: "firstName lastName",
      },
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

cartSchema.plugin(autopopulate);

export const Cart = model("Cart", cartSchema);
