import { Schema, model } from "mongoose";

const pigSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pen: {
      type: Number,
      enum: [1, 2, 3, 4],
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Boar",
        "DrySows",
        "In-pigs",
        "farrow-pigs",
        "Growers",
        "Weaners",
        "Piglets",
      ],
      required: true,
    },

    room: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    mortality: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      default: new Date(),
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

export const Pig = model("Pig", pigSchema);
