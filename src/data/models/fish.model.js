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
      required: true,
    },

    weight: {
      type: Number,
      default: 0,
    },

    mortality: {
      type: Number,
      default: 0,
    },
    openingBalance: {
      type: Number,
      default: 0,
    },

    closingBalance: {
      type: Number,
      default: 0,
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

export const Fish = model("Fish", fishSchema);
