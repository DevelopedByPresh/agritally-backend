import { Schema, model } from "mongoose";

const pigSchema = new Schema(
  {
    pen: {
      type: Number,
      enum: ["1", "2", "3", "4"],
      required: true,
    },
    category: {
      type: Number,
      enum: [
        "Boar",
        "Dry Sows",
        "In-pigs",
        "farrow-pigs",
        "Growers",
        "Weaners",
        "Piglets",
      ],
      required: true,
    },
    pen: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
