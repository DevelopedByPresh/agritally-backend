import { Schema, model } from "mongoose";

const fishSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    category: {
      type: String,
      enum: ["Fingerlings", "Mature"],
      required: true,
    },

    date: {
      type: Date,
      default: new Date(),
    },

    quantity: {
      type: Number,
      default: 1,
      required: true
    },

    price: {
      type: Number,
      required: true,
    },

    weight: {
      type: String,
      default: "0 kg",
    },
  
    status: {
      type: String,
      enum: ["Approved", "Pending"],
      default: "Pending"
    },
  },
  {
    timestamps: true,
  }
);

export const Fish = model("Fish", fishSchema);
