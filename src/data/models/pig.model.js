import { Schema, model } from "mongoose";

const pigSchema = new Schema(
  {
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
      enum: ["1", "2", "3", "4"],
      required: true,
    },

    room: {
      type: Number,
      required: true,
    },

    mortality: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
